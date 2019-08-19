'use strict';

const { Controller } = require('egg');

class UserController extends Controller {

  async getUser() {
    const { id } = this.ctx.session.user;
    const user = (await this.ctx.service.user.getUserInfo(id, {
      isUserHimself: true,
    })).toJSON();
    user.mobile = user.phoneNumber;
    user.userName = user.username;
    delete user.phoneNumber;
    delete user.username;
    this.ctx.body = {
      code: 0,
      data: {
        user,
      },
    };
  }

  async updateUser() {
    const { user } = this.ctx.request.body;
    await this.ctx.service.user.updateUserById(this.ctx.session.user.id, user);
    this.ctx.body = {
      code: 0,
      status: 200,
      data: {},
    };
  }

  async logout() {
    if (this.ctx.session.user) this.ctx.session.user = undefined;
    this.ctx.body = {
      code: 0,
    };
  }
}

module.exports = UserController;
