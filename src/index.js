import _kebabCase from 'lodash.kebabcase';
import * as util from './util';

const path = `${__dirname}/handlers/`;
const dirs = util.getDirectories(path);

const handlers = {};
dirs.forEach(dir => (handlers[_kebabCase(dir)] = util.createHandler(require(path + dir))), {});
export default handlers;
