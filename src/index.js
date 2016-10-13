import * as lib from './lib';
const handlers = {};

for (let fn in lib) {
  handlers[fn.toLowerCase()] = createHandler(lib[fn]);
}

export default handlers;

function createHandler(Clss) {
  return async (params, ctx, cb ) => {
    for (let param in params) {
      console.log(`${param}: ${params[param]}`);
    }

    try {
      const result = await (new Clss(params));
      return cb(null, result);

    } catch(err) {
      console.error(err);
      return cb(err);
    }
  };
}
