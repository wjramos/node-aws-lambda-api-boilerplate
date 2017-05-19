import request from 'request-promise';

export default class Proxy {
  constructor( options = {} ) {
    if (options && typeof options === 'string' || options.uri) {
      this.options = options;
      return this.passthrough();
    }
  }

  async passThrough() {
    try {
      const result = await request(this.options);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }
}
