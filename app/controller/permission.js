'use strict';
const { Controller } = require('egg');

class PermissionController extends Controller {
  async createNewPermission() {
    const { permission } = this.ctx.request.body;
    const created = await this.ctx.service.permission.createNewPermission(permission);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        permission: created,
      },
    };
  }

  async listPermissions() {
    const { query } = this.ctx.request;
    const permissions = await this.ctx.service.permission.listPermissions(query);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        permissions,
      },
    };
  }
  async getPermissionById() {
    const { id } = this.ctx.params;
    const query = {
      ids: [ id ],
    };
    const [ permission ] = await this.ctx.service.permission.listPermissions(query);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        permission,
      },
    };
  }

  async deletePermission() {
    const { id } = this.ctx.request.params;
    const query = {
      ids: [ id ],
    };
    const result = await this.ctx.service.permission.deletePermission(query);
    this.ctx.body = {
      code: 0,
      data: {
        result,
      },
    };
  }

  async updatePermission() {
    const { id } = this.ctx.params;
    const { permission } = this.ctx.request.body;
    permission.id = id;
    await this.ctx.service.permission.updatePermissionById(permission);
    this.ctx.body = {
      code: 0,
      status: 200,
    };
  }
}

module.exports = PermissionController;
