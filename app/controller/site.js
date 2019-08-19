'use strict';

const { Controller } = require('egg');

class SiteController extends Controller {

  async createUser() {
    const { username, password } = this.ctx.request.body;

    const createdUser = await this.ctx.service.user.createUserWithUnPw(username,
      password);

    this.ctx.body = {
      code: 0,
      data: {
        user: createdUser,
      },
    };
  }

  async getUser() {
    this.ctx.body = {
      code: 0,
      result: 'ok',
      description: 'success',
      data: {
        send_order: 1,
        unpaid_order: 2,
        user: {
          email: '',
          icon: '//s1.mi-img.com/mfsv2/download/fdsc3/p01EqaJOqAcW/Iyi86dNydBoYWa.jpg',
          mobile: '131****4068',
          userName: 'tony',
          user_id: 1313124239,
        },
      },
    };
  }

  async loginWithUnPw() {
    const { username, pwd } = this.ctx.request.body;

    const foundUser = await this.ctx.service.user.loginWithUnPw(username, pwd);

    this.ctx.session.user = { id: foundUser.id };

    this.ctx.body = {
      code: 0,
      status: 200,
      data: {
        attempt: this.ctx.session.attempts,
        user: {
          id: foundUser.id,
        },
      },
    };
  }

  async index() {
    this.ctx.body = {
      code: 0,
      data: {
        hasLogin: !!this.ctx.session.user,
      },
    };
  }

  async logout() {
    if (this.ctx.session.user) this.ctx.session.user = undefined;
    this.ctx.body = {
      code: 0,
    };
  }

  async sendVerifyCode() {
    const { phoneNumber } = this.ctx.request.body;

    const codeCoolingDown = await this.app.redis.get(`egg_mi_phone_verify_code_cool_down${phoneNumber}`);

    if (codeCoolingDown) {
      throw new Error('冷却中');
    }

    this.app.redis.set(`egg_mi_phone_verify_code_cool_down${phoneNumber}`, 'anything', 'PX', 60 * 1000);

    const verifyCode = Math.ceil(Math.random() * 100000);
    await this.app.redis.set(`egg_mi_phone_verify_code:phone${phoneNumber}`, verifyCode, 'PX', 5 * 60 * 1000);
    // this.verify
    this.ctx.body = {
      code: 0,
    };
  }
}

module.exports = SiteController;
