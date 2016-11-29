import { assert } from 'chai';

import * as util from '../util';

xdescribe('fetch', () => {
  it('should ', () => {
    assert();
  });
});

describe('parseHtml', () => {
  it('should parse html string to a DOM object', () => {
    const parsed = util.parseHtml('<div></div>');
    assert(parsed.body);
  });
});

describe('injectHeadScript', () => {
  const DOM = util.parseHtml('');
  it('should insert provided script into provided dom object', () => {
    const injected = util.injectHeadScript(DOM, 'test');
    assert(injected.head.contains('<script type="text/javascript">test</script>'));
  });
});
