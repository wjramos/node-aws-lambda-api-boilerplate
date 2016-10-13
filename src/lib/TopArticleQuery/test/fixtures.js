import * as CONST from '../constants';
import { truncateString } from '../util';

/////////////////////////
/* Test values */
export const BRAND = 'test';
export const LIMIT_TEST = 2;
export const TO_TEST = 'now-1d';
export const FROM_TEST = 'now-5d';


/////////////////////////
/* Fixtures setup */
const size = CONST.LIMIT_DEFAULT;
const gte = CONST.FROM_DEFAULT;
const lte = CONST.TO_DEFAULT;
const time_zone = CONST.TIME_ZONE;
const sort = [{[`share_count.${CONST.SOCIAL_DEFAULT}`]: CONST.SORT_DESC}];


/////////////////////////
/* Base fixture */
const term = { [ CONST.TERM_PROP ]: BRAND };
const range = {
    [ CONST.RANGE_PROP ]: {
        gte,
        lte,
        time_zone
    }
};
const must = [{ term }, { range }];
const bool = { must };
const query = { bool };


/////////////////////////
/* Test fixtures */
// From
const fromFixture = {
  range: {
    [ CONST.RANGE_PROP ]: {
      gte: FROM_TEST,
      lte,
      time_zone
    }
  }
};

// To
const toFixture = {
  range: {
    [ CONST.RANGE_PROP ]: {
      gte,
      lte: TO_TEST,
      time_zone
    }
  }
};

// Limit
const limitFixture = LIMIT_TEST;


/////////////////////////
/* Queries */
const BASE_QUERY = { query, sort, size };
const FROM_QUERY = {
    query: {
      bool: {
        must: [
          { term },
          fromFixture
        ]
      }
    },
    sort,
    size
};
const TO_QUERY = {
    query: {
      bool: {
        must: [
          { term },
          toFixture
        ]
      }
    },
    sort,
    size
};
const LIMIT_QUERY = {
    query,
    sort,
    size: limitFixture
};

export const INPUT_ARTICLE = {
    web_article_url: 'url',
    brand: 'brand',
    web_article_content: 'content',
    web_article_title: 'title',
    $imageThumbnailUrl: 'thumbnail',
    web_article_published: 1471990893,
    web_article_author: [ 'author' ],
    web_article_tags: [ 'tag' ],
    share_count: { 'share_count.total_count': 'shares' },
    $: { created: 'created' }
};

export const MAPPED_ARTICLE = {
    url: INPUT_ARTICLE.web_article_url,
    value: INPUT_ARTICLE.total_shares
};

export const MAPPED_ARTICLE_FULL = {
    url: INPUT_ARTICLE.web_article_url,
    value: INPUT_ARTICLE.total_shares,
    brand: INPUT_ARTICLE.brand,
    body: INPUT_ARTICLE.web_article_content,
    excerpt: truncateString( INPUT_ARTICLE.web_article_content ),
    headline: INPUT_ARTICLE.web_article_title,
    author: INPUT_ARTICLE.web_article_author[0],
    thumbnail: INPUT_ARTICLE.$imageThumbnailUrl,
    tags: [{ tag: INPUT_ARTICLE.web_article_tags[0], path: null }]
};

export const SEARCH_RESULTS = [1, 2, 3];
const NO_RESULTS_FETCH = { urls: [] };
const RESULTS_FETCH = { urls: SEARCH_RESULTS };


///////////////////////////////////
/* Export Test Conditions */
export const RESULTS = {
    BASE_EXPECTED: JSON.stringify( BASE_QUERY ),
    FROM_EXPECTED: JSON.stringify( FROM_QUERY ),
    TO_EXPECTED: JSON.stringify( TO_QUERY ),
    LIMIT_EXPECTED: JSON.stringify( LIMIT_QUERY ),

    FETCH_NO_RESULTS_EXPECTED: JSON.stringify( NO_RESULTS_FETCH ),
    FETCH_RESULTS_EXPECTED: JSON.stringify( RESULTS_FETCH ),

    MAPPED_ARTICLE: JSON.stringify( MAPPED_ARTICLE ),
    MAPPED_ARTICLE_FULL: JSON.stringify( MAPPED_ARTICLE_FULL )
};

export const INPUT = {
    BRAND: {
        brand: BRAND
    },

    LIMIT: {
        brand: BRAND,
        limit: LIMIT_TEST
    },

    FROM: {
        brand: BRAND,
        from: FROM_TEST
    },

    TO: {
        brand: BRAND,
        to: TO_TEST
    },

    ARTICLE: INPUT_ARTICLE
};
