import { assert } from 'chai';

import handlers, { createHandler } from '../src/handlers';

const getResult = (err, result) => result;

describe('createHandler', () => {
    let handler;

    beforeEach(() => handler = createHandler(Object));

    it('should return a function', () => {
      assert.isFunction(handler);
    });

    it('should pass a singleton of a class to the second parameter of a callback', () => {
      assert.isObject(createHandler(Object)({}, null, getResult));
    });
  }
);
