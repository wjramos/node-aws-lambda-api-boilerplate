import polyfill from 'babel-polyfill';
import * as lib from './lib';
const handlers = {};

for (let fn in lib) {
  handlers[fn.toLowerCase()] = createHandler(lib[fn]);
}

export default handlers;

function createHandler(Clss) {
  return async (e, ctx, cb ) => {
    for (let param in e) {
      console.log(`${param}: ${e[param]}`);
    }

    try {
      const result = await (new Clss(e));
      return cb(null, result);

    } catch(err) {
      console.error(err);
      return cb(err);
    }
  };
}
