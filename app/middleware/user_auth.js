'use strict';

module.exports = opts => async (ctx, next) => {
  console.log('middlewaire', opts);
  if (!ctx.session.user) {
    throw new ctx.app.error.NoAuth();
  }
  await next();
};
