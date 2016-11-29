import { assert } from 'chai';
import { noCallThru } from 'proxyquire';
import { spy } from 'sinon';

import * as util from '../util';

const proxyquireStrict = noCallThru();
const rqSpy = spy();
const { fetch } = proxyquireStrict('../util', {
  'request-promise': rqSpy
});

describe('fetch', () => {
  const FETCH_INPUT = 'test';
  let result;

  beforeEach( ( ) => {
    result = fetch(FETCH_INPUT);
  } );
  afterEach( ( ) => {
    rqSpy.reset();
  } );

  it('should call request-promise with provided value', async () => {
    assert(rqSpy.calledWith(FETCH_INPUT));
  });

  it('should return a promise', () => {
    assert.instanceOf(result, Promise);
  });
});

{
  const HTML = '<html><head></head><body></body></html>';
  const doc = util.parseHtml(HTML);

  describe('parseHtml', () => {
    it('should parse html string to a DOM object', () => {
      assert.isObject(doc);
    });
  });

  describe('injectHeadScript', () => {
    const SCRIPT_INPUT = 'test';
    it('should insert provided script into provided dom object', () => {
      const tampered = util.injectHeadScript(doc, SCRIPT_INPUT);
      assert(tampered.firstChild.firstChild.firstChild.firstChild.nodeValue === SCRIPT_INPUT);
    });
  });
}
