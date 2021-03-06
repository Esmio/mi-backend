'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/v1/user/', controller.user.getUser);
  router.post('/api/v1/user/logout', controller.user.logout);
  router.patch('/api/v1/user/', controller.user.updateUser);

  /**
  * @apiVersion 0.1.0
  * @api {POST} /user 创建用户
  * @apiGroup site
  *
  * @apiParam {String} username 用户名
  * @apiParam {String} password 密码
  *
  * @apiSuccess {Integer} code 响应码
  * @apiSuccess {Object} data 数据
  * @apiSuccess {Object} data.user 用户对象
  * @apiSuccess {String} data.user.id 用户id，UUIDv4版本
  *
  * @apiSuccessExample Success-Response:
  *{"code":0,"data":{"user":{"id":"512914f0-84ad-40e2-a7af-3604d828d491","username":"11117",
  * "updated_at":"2019-01-30T12:56:58.273Z","created_at":"2019-01-30T12:56:58.273Z","phoneNumber":null}}}
  *
  */

  /**
  * @apiVersion 0.2.0
  * @api {POST} /user 创建用户
  * @apiGroup site
  *
  * @apiParam {String} username 用户名
  * @apiParam {String} password 密码
  * @apiParam {String} validateCode 校验码
  *
  * @apiSuccess {Integer} code 响应码
  * @apiSuccess {Object} data 数据
  * @apiSuccess {Object} data.user 用户对象
  * @apiSuccess {String} data.user.id 用户id，UUIDv4版本
  *
  * @apiSuccessExample Success-Response:
  *{"code":0,"data":{"user":{"id":"512914f0-84ad-40e2-a7af-3604d828d491","username":"11117",
  * "updated_at":"2019-01-30T12:56:58.273Z","created_at":"2019-01-30T12:56:58.273Z","phoneNumber":null}}}
  *
  */

};
