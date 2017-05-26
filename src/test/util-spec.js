import { assert } from 'chai';

import { createHandler, isClass } from '../util';

const getResult = (err, result) => result;
const getError = (err, result) => err;

describe('createHandler', () => {
  const CONSTRUCTOR = Object;
  const FUNC = () => {};
  let classHandler;

  beforeEach(() => {
    classHandler = createHandler(CONSTRUCTOR);
    fnHandler = createHandler(FUNC);
  );

  it('should return a function', () => {
    assert.isFunction(classHandler);
    assert.isFunction(fnHandler);
  });

  it('should pass a singleton of a class to the second parameter of a callback', () => {
    assert.instanceOf(classHandler({}, null, getResult), CONSTRUCTOR);
  });

  it('should pass a regular function the second parameter of a callback', () => {
    assert.instanceOf(fnHandler({}, null, getResult), Function);
  });

  it('should pass an error to first parameter if an error is encountered', () => {
    assert(classHandler({}, null, getError));
    assert(fnHandler({}, null, getError));
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

describe('kebabCase', () => {
});
