import request from 'request-promise';

export default class Proxy {
  constructor( options = {} ) {
    if (options && typeof options === 'string' || options.uri) {
      return request(options);
    }
  }
}
