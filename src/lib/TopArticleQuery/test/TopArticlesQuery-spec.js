import assert from 'assert';
import { spy, stub } from 'sinon';
import prequire from 'proxyquire';

import { INPUT, RESULTS } from './fixtures';
import { cloneObject, truncateString } from '../util';

const searchStub = stub().returns([1,2,3]);
const STUBBED_TIMESTAMP = 0;
const imports = prequire( '../TopArticlesQuery', {
  './util': {
      searchContent: async query => searchStub,
      parseDateExp: exp => STUBBED_TIMESTAMP
  }
} );

const Query = imports.default;
const { mapCaasQuery, mapContent } = imports;

describe( 'TopArticlesQuery', ( ) => {
    it( 'should bail if first brand parameter is not specified', ( ) => {
        const testInstance = new Query( );
        assert( !testInstance.query );
    } );

    it( 'should set up class if brand parameter is specified', ( ) => {
        const testInstance = new Query( INPUT.BRAND );
        assert( testInstance.query );
    } );

    it( 'should correctly form base ElasticSearch query for given parameters', ( ) => {
        const testInstance = new Query( INPUT.BRAND );
        assert.equal( testInstance.query.query.bool.must[0].term.brand, 'test' );
    } );
} );

describe( 'TopArticlesQuery.fetch', ( ) => {
    it( 'should return empty set if no query set (or no results found)', ( ) => {
        const testInstance = new Query( INPUT.BRAND );
        testInstance.query = false;
        testInstance.fetch().then( result => assert.equal( result.urls.length, testInstance.results.urls, 0 ) );
    } );

    xit( 'should return results and assign to query instance', ( ) => {
        const testInstance = new Query( INPUT.BRAND );
        testInstance.fetch().then( result => assert.equal( result.urls.length, 1 ) );
        assert.equal( testInstance.results.urls[0].brand, 'test' );
    } );
} );

describe( 'mapCaasQuery', ( ) => {
    it( 'should throw error when brand is not specified', ( ) => {
        assert.throws( mapCaasQuery, /ERROR: Brand is required/, 'Did not throw with expected error' );
    } );

    it( 'should return base query if only brand specified', ( ) => {
        const mapped = mapCaasQuery( INPUT.BRAND );
        assert.equal( mapped.query.bool.must[0].term.brand, 'test');
    } );

    it( 'should correctly set query query Limit size', ( ) => {
        const mapped = mapCaasQuery( INPUT.LIMIT );
        assert.equal( mapped.size, INPUT.LIMIT.limit );
    } );

    it( 'should correctly set query From date string', ( ) => {
        const mapped = mapCaasQuery( INPUT.FROM );
        assert.equal( mapped.query.bool.must[1].range.web_article_published.lte, STUBBED_TIMESTAMP );
    } );

    it( 'should correctly set query To date string', ( ) => {
        const mapped = mapCaasQuery( INPUT.TO );
        assert.equal( mapped.query.bool.must[1].range.web_article_published.gte, STUBBED_TIMESTAMP );
    } );
} );

describe( 'mapContent', ( ) => {
    it( 'should return undefined when valid article not supplied', ( ) => {
        const mapped = mapContent();
        assert( !mapped );
    } );
    it( 'should return base object when not set to full', ( ) => {
        const mapped = mapContent( INPUT.ARTICLE, false );
        assert( mapped.url && !mapped.headline );
    } );
    it( 'should return full content object when full is true', ( ) => {
        const mapped = mapContent( INPUT.ARTICLE, true );
        assert( mapped.url && mapped.headline );
    } );
} );
