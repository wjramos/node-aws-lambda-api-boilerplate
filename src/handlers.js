import _kebabCase from 'lodash.kebabcase';
import * as util from './util';
import * as handlers from './handlers';

export default Object.keys(handlers).reduce((handlers, handler) => {
  handlers[_kebabCase(handler)] = util.createHandler(handlers[handler]);
  return handlers;
}, {});
