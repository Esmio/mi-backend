'use strict';
const { Service } = require('egg');
class Permission extends Service {
  async createNewPermission(permission) {
    const created = await this.app.model.Permission.createNewPermission(permission);
    return created;
  }

  async listPermissions(query) {
    const permissions = await this.app.model.Permission.listPermissions(query);
    return permissions;
  }

  async getPermissionById(id) {
    const role = await this.app.model.Permission.listPermissions({ ids: [ id ] });
    return role;
  }

  async updatePermissionById(permission) {
    const updated = await this.app.model.Permission.updatePermission(permission);
    return updated;
  }
}

module.exports = Permission;
