export function createHandler(Clss) {
  return async (params, ctx, cb) => {
    for (let param in params) {
      console.log(`${param}: ${params[param]}`);
    }

    try {
      if (!isClass(Clss)) { throw new Error(`${Clss.name} is not a class`) };
      const result = await (new Clss(params));
      return cb(null, result);

    } catch(err) {
      console.error(err);
      return cb(err);
    }
  };
}

export function isClass(fn) {
  if ( typeof fn === 'function' && fn.prototype.constructor === fn ) {
    try {
      return !!new fn();
    } catch (e) {}
  }

  return false;
}
