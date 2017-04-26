import { S3 } from 'aws-sdk';
import request from 'request-promise';
import { parse as parseUrl } from 'url';

import { RECENT_ARTICLES, S3_BUCKET, AWS_CONFIG } from './config';

const s3 = new S3(AWS_CONFIG);
const prontoCache = new Map();
const renderedCache = new Map();

const PRONTO_CACHE_TTL = 30 * 60 * 1000; // 30 min
const RENDERED_CACHE_TTL = 24 * 60 * 60 * 1000; // 1 day

export default class Articles {
  constructor( params = {} ) {
    this.params = params;
    return this.getArticles();
  }

  async getPronto() {
    const { brand, limit = 20, offset = 0 } = this.params;
    const endpoint = `${RECENT_ARTICLES}?brand=${brand}&limit=${limit}&offset=${offset}`;
    const cached = prontoCache.get(endpoint);
    if (cached && Date.now() < cached.expires) {
      return cached.result;
    }

    try {
      const result = JSON.parse(await request(endpoint));
      prontoCache.set(endpoint, { result, expires: Date.now() + PRONTO_CACHE_TTL });
      return result;
    } catch (err) {
      return { err };
    }
  }

  s3Get(Bucket, Key) {
    return new Promise((resolve, reject) => {
      try {
        return s3.getObject({ Bucket, Key }, (err, data) => {
          if (err) {
            return reject(err);
          }

          return resolve(data.Body.toString());
        });
      } catch (e) {
        console.error('Could not retrieve content from s3', err);
      }
    });
  }

  sanitize(article) {
    delete article.pronto;
    delete article.$;
    delete article.$i_social_posts;
    delete article.$i_$sameAs;
    delete article.$type;
    delete article.pronto_hash;
    delete article.tardisbackfill;
    delete article.tardisreingest;
    delete article['projection-google'];
    delete article['projection-yahoo'];
    delete article['projection-msn'];
    delete article['projection-facebook'];
    delete article['projection-apple'];

    return article;
  }

  async getRenderedArticle(article) {
    const { brand } = this.params;
    const pathname = parseUrl(article.asset_url).pathname;
    const key = `${brand}${pathname}/index.html`;
    const cached = renderedCache.get(key);

    if (cached && Date.now() < cached.expires) {
      return cached.result;
    }

    let rendered;

    try {
      rendered = await this.s3Get(S3_BUCKET, key);
    } catch (e) {
      console.error('Could not get content', e);
    }

    if (this.params.rendered !== false) {
      article.rendered = rendered;
    }

    article.hero = (
      article.pronto.filter(component => component.type === 'components/article/hero-image') ||
      article.pronto.filter(component => component.type === 'components/article/figure')
    )[0].data;
    article.id = article.$.id;

    const result = this.sanitize(article);
    renderedCache.set(key, { result, expires: Date.now() + RENDERED_CACHE_TTL });

    return result;
  }

  async getRenderedArticles(articles = []) {
    const results = [];
    for (let article of articles) {
      results.push(await this.getRenderedArticle(article));
    }

    return results;
  }

  async getArticles() {
    let { articles = [] } = await this.getPronto();
    return await this.getRenderedArticles(articles);
  }
}
