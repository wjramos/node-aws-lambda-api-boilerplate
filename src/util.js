import fs from 'fs';
import path from 'path';

export function createHandler(fn) {
  return async (params, ctx, cb) => {
    // for (let param in params) {
    //   console.log(`${param}: ${params[param]}`);
    // }

    try {
      if (isClass(fn)) {
        return cb(null, await new fn(params));
      }

      return cb(null, await fn(params));
    } catch (err) {
      return cb(err);
    }
  };
}

export function isClass(fn) {
  return !!(typeof fn === 'function' && fn.prototype && fn.prototype.constructor === fn && new fn());
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
