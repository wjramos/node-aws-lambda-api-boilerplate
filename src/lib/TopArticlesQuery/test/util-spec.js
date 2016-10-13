import assert from 'assert';
import { spy, stub } from 'sinon';
import prequire from 'proxyquire';

let search = spy();
const { searchContent, cloneObject, truncateString, parseDateExp, roundDate, convertDate } = prequire( '../util', {
  'caas-content-client-node': ( env, token ) => { return { search } }
} );


describe( 'searchContent', ( ) => {
    it( 'should invoke the search method of a caas-content-client-node instance', ( ) => {
        searchContent();
        assert( search.called );
    } );
} );

describe( 'cloneObject', ( ) => {
    it( 'should create a new instance of an object with all of the same properties', ( ) => {
        const testObj = { a: 1 };
        const cloneObj = cloneObject( testObj );

        assert.equal( testObj, testObj );
        assert.equal( testObj.a, cloneObj.a );
        assert.notEqual( testObj, cloneObj );
    } );
} );

describe( 'truncateString', ( ) => {
    it( 'should not truncate string below the length threshold', ( ) => {
        const testString = 'abc';
        const truncated = truncateString( testString, 5);
        assert.equal( truncated, testString );
    } );

    it( 'should only truncate between words (rounded down)', ( ) => {
        const testString = 'abc def';
        const truncated = truncateString( testString, 5 );
        assert( truncated.indexOf( ' ' ) < 0 );
    } );

    it( 'should append an ellipsis after truncated word', ( ) => {
        const testString = 'abc def';
        const truncated = truncateString( testString, 5 );
        assert( truncated.indexOf( '\u2026' ) > -1 );
    } );
} );

describe( 'parseDateExp', ( ) => {
    /**
     * @param dateExp String The elasticsearch date expression
     * @param now     Number The value of Now, defaults to Date.now()
     **/
    const NOW = 1471553428111;
    const NOW_ROUNDED = 1471553428000;

    it( 'should correctly handle now', ( ) => {
        assert.equal( parseDateExp( 'now', NOW ), NOW );
    } );

    it( 'should correctly handle addition', ( ) => {
        assert.equal( parseDateExp( 'now+1s', NOW ), NOW + 1000 );
    } );

    it( 'should correctly handle subtraction', ( ) => {
        assert.equal( parseDateExp( 'now-1s', NOW ), NOW - 1000 );
    } );

    it( 'should correctly handle rounding', ( ) => {
        assert.equal( parseDateExp( 'now/s', NOW ), NOW_ROUNDED );
    } );
} );

describe( 'roundDate', ( ) => {
    /**
     * @param timestamp Number The timestamp to round down
     * @param roundTo   String The date unit to round down to
     **/
    const INPUT_TIMESTAMP = 1471553428111;
    const OUTPUT_SECOND = 1471553428000;
    const OUTPUT_MINUTE = 1471553400000;
    const OUTPUT_HOUR = 1471550400000;
    const OUTPUT_DAY = 1471503600000;
    const OUTPUT_WEEK = 1471158000000;
    const OUTPUT_MONTH = 1470034800000;
    const OUTPUT_YEAR = 1451635200000;

    it( 'should properly round to the nearest second', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 's' ), OUTPUT_SECOND );
    } );

    it( 'should properly round to the nearest minute', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'm' ), OUTPUT_MINUTE );
    } );

    it( 'should properly round to the nearest hour', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'h' ), OUTPUT_HOUR );
    } );

    it( 'should properly round to the nearest day', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'd' ), OUTPUT_DAY );
    } );

    it( 'should properly round to the nearest week', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'w' ), OUTPUT_WEEK );
    } );

    it( 'should properly round to the nearest month', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'M' ), OUTPUT_MONTH );
    } );

    it( 'should properly round to the nearest year', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'y' ), OUTPUT_YEAR );
    } );

    it( 'should return same timestamp if no rounding specified', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP ), INPUT_TIMESTAMP );
    } );

    it( 'should return same timestamp if bad unit specified', ( ) => {
        assert.equal( roundDate( INPUT_TIMESTAMP, 'x' ), INPUT_TIMESTAMP );
    } );
} );

describe( 'convertDate', ( ) => {
    /**
     * @param num  Number The given number of a specified unit of time
     * @param unit String The date unit to parse to ms
     **/
    it( 'should propertly handle cases where no unit specified (pass through as ms)', ( ) => {
        assert.equal( convertDate( 1 ), 1 );
    } );

    it( 'should propertly handle seconds (s)', ( ) => {
        assert.equal( convertDate( 1, 's' ), 1000 );
    } );

    it( 'should propertly handle minutes (m)', ( ) => {
        assert.equal( convertDate( 1, 'm' ), 60000 );
    } );

    it( 'should propertly handle hours (h)', ( ) => {
        assert.equal( convertDate( 1, 'h' ), 3600000 );
    } );

    it( 'should propertly handle days (d)', ( ) => {
        assert.equal( convertDate( 1, 'd' ), 86400000 );
    } );

    it( 'should propertly handle weeks (w)', ( ) => {
        assert.equal( convertDate( 1, 'w' ), 604800000 );
    } );

    it( 'should propertly handle months (M)', ( ) => {
        assert.equal( convertDate( 1, 'M' ), 2419200000 );
    } );

    it( 'should propertly handle years (y)', ( ) => {
        assert.equal( convertDate( 1, 'y' ), 29030400000 );
    } );

    it( 'should ignore invalid units and treat as ms', ( ) => {
        assert.equal( convertDate( 1, 'x' ), 1 );
    } );
} );
