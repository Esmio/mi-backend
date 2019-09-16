'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.post('/api/v1/admin/permission', controller.permission.createNewPermission);
  router.get('/api/v1/admin/permission', controller.permission.listPermissions);
  router.get('/api/v1/admin/permission/:id', controller.permission.getPermissionById);
  router.patch('/api/v1/admin/permission/:id', controller.permission.updatePermission);

};
