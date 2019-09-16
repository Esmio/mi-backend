'use strict';

module.exports = opts => async (ctx, next) => {
  console.log(opts);
  if (!ctx.session.user) {
    throw new ctx.app.error.NoAuth();
  }

  // see if user has permission

  const { user } = ctx.session;

  // TODO this is a mock role_id

  const ROLE_IDS = [ 'fb68dd4c-9497-4baa-9f92-bcfa71d621ee' ];

  if (!user.permissions) {
    // query user role
    // query user permission
    // access or no access

    const roles = await ctx.service.role.listRoles({ ids: ROLE_IDS });
    const permissions = await ctx.service.permission.listPermissions({ role_ids: roles.map(r => r.id) });

    user.permissions = permissions.map(p => p.toJSON());

  }

  const { path, method } = ctx.request;

  const allowed = user.permissions.find(p =>
    p.path === path && p.allowed === true && p.method.toUpperCase() === method
  );

  if (!allowed) {
    throw new ctx.app.error.NoAuth();
  }

  await next();
};
