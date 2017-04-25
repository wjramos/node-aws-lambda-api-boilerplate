import { S3 } from 'aws-sdk';
import request from 'request-promise';
import { parse as parseUrl } from 'url';

import { RECENT_ARTICLES, S3_BUCKET, AWS_CONFIG } from './config';

const s3 = new S3(AWS_CONFIG);

export default class Articles {
  constructor( params = {} ) {
    this.params = params;
    return this.getArticles();
  }

  async getPronto() {
    const { brand, limit = 20, offset = 0 } = this.params;
    try {
      return JSON.parse(await request(`${RECENT_ARTICLES}?brand=${brand}&limit=${limit}&offset=${offset}`));
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
    let rendered;

    try {
      rendered = await this.s3Get(S3_BUCKET, key);
    } catch (e) {
      console.error('Could not get content', e);
    }

    article.rendered = rendered;

    return this.sanitize(article);
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
