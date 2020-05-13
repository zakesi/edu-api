'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登录
  router.post('/api/sms/send', controller.auth.sms);
  router.post('/api/sms/login', controller.auth.login);
  // 微信登录
  router.get('/api/auth/social/wechat/url', controller.wechat.oAuthWebUrl)
  router.get('/api/auth/social/wechat', controller.wechat.oAuthWeb)
  // 服务
  router.get('/api/qiniu/token', controller.qiniu.token);
  router.post('/api/notification/feishu', controller.notification.feishu);
};