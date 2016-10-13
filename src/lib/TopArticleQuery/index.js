import stripTags from 'striptags';

import * as CONST from './constants';
import * as util from './util';

export default class ElasticSearchQuery {
  constructor ( config = {} ) {
    const { brand = '', full = true } = config;
    this.results = { urls: [] };

    if ( brand ) {
      this.config = config;
      this.query = mapCaasQuery( config );
    }

    return fetch();
  }

  async fetch () {
    if ( !this.query ) return this.results;

    const { full, social } = this.config;

    let results = await util.searchContent( this.query, 'production' ) || {};

    if ( results.entities ) {
      const urls = results.entities.map( article => mapContent( article, full, social ) );
      this.results = { urls };
    }

    return this.results;
  }
}

export function mapCaasQuery ( config = {} ) {
    const { brand, from = CONST.FROM_DEFAULT, to = CONST.TO_DEFAULT, limit = CONST.LIMIT_DEFAULT, social = CONST.SOCIAL_DEFAULT, date = CONST.DATE_DEFAULT } = config;
    if ( !brand ) { throw new Error( 'ERROR: Brand is required' ) }

    const query = util.cloneObject( CONST.QUERY_BASE );
    const sort = util.cloneObject( CONST.SORT_DESC );
    const timeKey = date !== 'publish' ? CONST.MOD_PROP : CONST.PUB_PROP;
    const time_zone = CONST.TIME_ZONE;
    const brandKey = CONST.TERM_PROP;

    const mustArr = query.query.bool.must;
    const sortArr = query.sort;

    /**
     * Date Format and Date Math References:
     *
     * https://www.elastic.co/guide/en/elasticsearch/reference/1.7/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern
     * https://www.elastic.co/guide/en/elasticsearch/reference/1.7/mapping-date-format.html#date-math
     **/
    const sortKey = `share_count.${ social }`;

    // Since web_article_published is not a date field, but is instead a number field, this piece is removed and date expressions are parsed in the range
    // Number
    const gte = util.parseDateExp( from );
    const lte = util.parseDateExp( to );

    const time = { gte, lte };

    // Date
    // const gte = from;
    // const lte = to;
    // time = { gte, lte, time_zone };

    const range = {[ timeKey ]: time};
    const term = {[ brandKey ]: brand};
    const sorting = {[ sortKey ]: sort};

    mustArr.push({ term }, { range });
    sortArr.push( sorting );
    query.size = limit;

    return query;
}

export function mapContent ( article = {}, full = true, social = 'total_count' ) {
  if ( !article.brand ) { return }

  const url = article.web_article_url;
  const value = article.share_count ? article.share_count[ social ] : 0;

  if ( !full || full === 'false' ) {
    return { url, value };
  }

  /* Full response */
  const brand = article.brand;
  const published = new Date( article.web_article_published * 1000 ).toISOString();
  const body = article.web_article_content || '';
  const excerpt = util.truncateString( util.stripShortcodes( stripTags( body ) ) );
  const headline = article.web_article_title;
  const author = article.web_article_author && article.web_article_author.length ? article.web_article_author[0] : '';
  const total_shares = article.share_count ? article.share_count.total_count : 0;
  const thumbnail = article.$imageThumbnailUrl || '';

  /* @TODO - determine what path in onebot output is used for and populate if necessary */
  const path = null;
  const tags = article.web_article_tags ? article.web_article_tags.map( tag => ({ tag, path }) ) : [];

  return { url, value, brand, tags, headline, published, author, body, excerpt, total_shares, thumbnail };
}
