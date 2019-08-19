'use strict';

module.exports = opts => async (ctx, next) => {
  console.log('midll', opts, ctx, next);
  throw new Error('you neet to login first');
  // await next();
};
