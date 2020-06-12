'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const Auth = middleware.auth;
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
  // 用户
  router.get('/api/user/user-info', Auth(), controller.user.userInfo);
  router.put('/api/user/user-info', Auth(), controller.user.updateUserInfo);
  router.put('/api/user/phone-bind', Auth(), controller.user.bindPhone);
  router.get('/api/user/wechat-bind', Auth(), controller.user.bindWechat);
  router.delete('/api/user/wechat-bind', Auth(), controller.user.unBindWechat);
  router.put('/api/user/resume', Auth(), controller.resume.updateResume);
  router.get('/api/user/resume/:id', controller.resume.showResume);
  // 课程
  router.get('/api/course/www-recommand', controller.course.wwwRecommand);
  router.get('/api/course/:id', controller.course.show);
  router.get('/api/section/:id', controller.section.show);
  // 职业
  router.get('/api/zhiye/www-recommand', controller.zhiye.wwwRecommand);
  router.get('/api/zhiye/:id', controller.zhiye.show);
  router.get('/api/zhiye', controller.zhiye.index);
  // 测评
  router.get('/api/stack', controller.stack.index);
  router.get('/api/stack/www-recommand', controller.stack.wwwRecommand);
  router.get('/api/stack/:id/random', controller.stack.random);
};