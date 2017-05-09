import request from 'request-promise';

export default class Proxy {
  constructor( options = {} ) {
    return request(options);
  }
}
