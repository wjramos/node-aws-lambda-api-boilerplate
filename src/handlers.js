import _kebabCase from 'lodash.kebabcase';
import * as util from './util';
import * as lib from './lib';

const handlers = {};

// Generate new handler per lib function
for (let fn in lib) {
  handlers[_kebabCase(fn)] = util.createHandler(lib[fn]);
}

export default handlers;
