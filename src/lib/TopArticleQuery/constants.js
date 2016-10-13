
export const CAAS_PROD_KEY = 'RXAbBxzSvj7HysayaMPIj7GY6qvZJIPw2UpxeHTW';
export const CAAS_TEST_KEY = '';

/* CaaS */
export const PUB_PROP = 'web_article_published';
export const MOD_PROP = 'time';
// export const RANGE_PROP = 'share_count.$last_modified';
export const TERM_PROP = 'brand';

/* Defaults */
export const SOCIAL_DEFAULT = 'total_count';
export const DATE_DEFAULT = 'publish';
export const TIME_ZONE = '-5:00'; // EST
export const FROM_DEFAULT = 'now-1d';
export const TO_DEFAULT = 'now';
export const LIMIT_DEFAULT = 10;
export const TRUNCATE_LENGTH = 150;

export const SORT_DESC = {
  unmapped_type: 'long',
  mode: 'avg',
  order: 'desc',
  missing: '_last'
};

/**
 * Base filter query – 'must' gets populated URL regex and range filters
 *
 * https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl-constant-score-query.html
 * https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl-bool-query.html
 **/
const must = [];
const bool = { must };
const query = { bool };

const field = '$imageThumbnailUrl';
const exists = { field };
const filter = { exists };

const sort = [];

export const QUERY_BASE = { query, filter, sort };
