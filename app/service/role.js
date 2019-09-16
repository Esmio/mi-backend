'use strict';
const { Service } = require('egg');
class Role extends Service {
  async createNewRole(role) {
    const created = await this.app.model.Role.createNewRole(role);
    return created;
  }

  async listRoles(query) {
    const roles = await this.app.model.Role.listRoles(query);
    return roles;
  }

  async getRoleById(id) {
    const role = await this.app.model.Role.listRoles({ ids: [ id ] });
    return role;
  }

  async updateRoleById(role) {
    const updated = await this.app.model.Role.updateRole(role);
    return updated;
  }

}

module.exports = Role;
