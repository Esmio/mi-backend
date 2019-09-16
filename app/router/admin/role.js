'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.post('/api/v1/admin/role', controller.role.createNewRole);
  router.get('/api/v1/admin/role', controller.role.listRoles);
  router.get('/api/v1/admin/role/:id', controller.role.getRoleById);
  router.patch('/api/v1/admin/role/:id', controller.role.updateRole);

};
