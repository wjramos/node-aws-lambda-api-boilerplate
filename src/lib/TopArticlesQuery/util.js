import CaaS from 'caas-content-client-node';
import assign from 'assign-deep';
import moment from 'moment';

import * as CONST from './constants';

let caas;

export async function searchContent( query, env = process.env.ENV, follow = null, type = 'web_article', provider = 'tardisnyc' ) {
  const token = env === 'production' ? CONST.CAAS_PROD_KEY : CONST.CAAS_TEST_KEY;
  console.log('Performing query:', JSON.stringify(query));
  /* Share CaaS instance across searches */
  caas = caas || CaaS( env, token );
  try {
    return await caas.search( query, follow, type, provider );
  } catch (err) {
    throw new Error('CaaS search failed:', err);
  }
}

export function cloneObject( object ) {
  return assign( {}, object );
}

/* @TODO: Maybe excerpt should be available from what CaaS provides */
export function truncateString( text = '', length = CONST.TRUNCATE_LENGTH ) {
  return text.slice(0, length).replace(/(.*)([^a-zA-Z0-9].*?$)/, '$1\u2026');
}

/* @HACK: Some brands are not properly stripping shortcodes (EW) and we don't want this to be part of the excerpt */
export function stripShortcodes( text = '' ) {
  const tags = new RegExp(`\[.*?\]`, 'g');
  return text.replace(tags, '');
}


/**
 * Parses elasticsearch date expression to number timestamp
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#date-math
 **/
export function parseDateExp( dateExp, now = Date.now() ) {
  const frag = dateExp.match(/now([-+]?)([\d]*)([\w]?)([\/]?)([\w\d]*)/);
  const oper = frag[1] || '-';
  const num = frag[2] || 0;
  const unit = frag[3] || 'd';
  const round = !!frag[4];
  const roundTo = frag[5] || 'd';

  const mod = convertDate( num, unit );

  let timestamp = now;

  if ( oper ) {
    if ( oper === '+' ) {
      timestamp += mod;
    } else {
      timestamp -= mod;
    }
  }

  if ( round ) {
    timestamp = roundDate( timestamp, roundTo );
  }

  return timestamp;
}

export function roundDate( timestamp, roundTo ) {
  if ( !roundTo ) { return timestamp }

  let interval;

  switch ( roundTo ) {
    case 's' || 'second': {
      interval = 'second';
      break;
    }

    case 'm' || 'minute': {
      interval = 'minute';
      break;
    }

    case 'h' || 'hour': {
      interval = 'hour';
      break;
    }

    case 'd' || 'day': {
      interval = 'day';
      break;
    }

    case 'w' || 'week': {
      interval = 'week';
      break;
    }

    case 'M' || 'month': {
      interval = 'month';
      break;
    }

    case 'y' || 'year': {
      interval = 'year';
      break;
    }
  }

  return moment(timestamp).startOf(interval).valueOf();
}

export function convertDate( num, unit = '' ) {

  /* Milliseconds / Unsupported */
  if ( !unit.match( /s|m|h|d|w|M|y/ ) ) {
    return num;
  }

  /* Seconds */
  num *= 1000;
  if ( unit === 's' ) {
    return num;
  }

  /* Minutes */
  num *= 60;
  if ( unit === 'm' ) {
    return num;
  }

  /* Hours */
  num *= 60;
  if ( unit === 'h' ) {
    return num;
  }

  /* Days */
  num *= 24;
  if ( unit === 'd' ) {
    return num;
  }

  /* Weeks */
  num *= 7;
  if ( unit === 'w' ) {
    return num;
  }

  /* Months */
  num *= 4;
  if ( unit === 'M' ) {
    return num;
  }

  /* Years */
  num *= 12;
  return num;
}
