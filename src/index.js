import _kebabCase from 'lodash.kebabcase';
import * as util from './util';

const path = `${__dirname}/handlers/`;
const dirs = util.getDirectories(path);

export default dirs.reduce((handlers, dir) => {
  handlers[_kebabCase(dir)] = util.createHandler(require(path + dir));
  return handlers;
}, {});
