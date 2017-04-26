import fs from 'fs';
import path from 'path';

export function createHandler(Clss) {
  return async (params, ctx, cb) => {
    for (let param in params) {
      console.log(`${param}: ${params[param]}`);
    }

    try {
      if (!isClass(Clss)) { throw new Error(`${Clss.name} is not a class`) };
      return cb(null, await new Clss(params));
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

export function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => (
    fs.statSync(path.join(srcpath, file)).isDirectory()
  ));
}

export function kebabCase(str) {
  const firstChar = str.charAt(0);
  return str
    .replace(firstChar, firstChar.toLowerCase())
    .replace(/([A-Z])/g, (search, match) => `-${match.toLowerCase()}`);
}
