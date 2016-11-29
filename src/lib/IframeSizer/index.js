import * as util from './util';
import * as CONST from './constants';

export default class IframeSizer {
  constructor( params = {} ) {
    this.params = params;
    const { src = '' } = params;

    return this.resize( src )
  }

  async resize ( src ) {
    const html = await this.fetch( src );
    const doc = this.inject( this.parse( html ) );
    return this.serialize( doc );
  }

  fetch ( src ) {
    return util.fetch( src );
  }

  parse ( html ) {
    return util.parseHtml( html );
  }

  inject ( doc ) {
    return util.injectHeadScript( doc, CONST.RESIZE_SCRIPT );
  }

  serialize ( doc ) {
    return util.serializeHtml( doc );
  }
}
