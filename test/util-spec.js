import { assert } from 'chai';

import { createHandler, isClass } from '../src/util';

const getResult = (err, result) => result;
const getError = (err, result) => err;

describe('createHandler', () => {
  const Constructor = Object;
  let handler;

  beforeEach(() => handler = createHandler(Constructor));

  it('should return a function', () => {
    assert.isFunction(handler);
  });

  it('should pass a singleton of a class to the second parameter of a callback', () => {
    assert.instanceOf(handler({}, null, getResult), Constructor);
  });

  it('should pass an error to first parameter if an error is encountered', () => {
    assert(handler({}, null, getError));
  });
});

describe('isClass', () => {
  const CLASS = Object;
  const CONSTRUCTOR = function() { this.test = true };
  const CLASS_INSTANCE = new CLASS();
  const CONSTRUCTOR_INSTANCE = new CONSTRUCTOR();

  it('should return true for functions that are constructors', () => {
    assert(isClass(CLASS));
    assert(isClass(CONSTRUCTOR));
    assert(isClass(function(){}));
  });

  it('should return false for functions that are not classes', () => {
    assert(!isClass(''));
    assert(!isClass(null));
    assert(!isClass(undefined));
    assert(!isClass(0));
    assert(!isClass(CLASS_INSTANCE));
    assert(!isClass(CONSTRUCTOR_INSTANCE));
  });
});
