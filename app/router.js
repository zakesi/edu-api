'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/version', controller.version.index);
  router.post('/api/sms/send', controller.auth.sms);
  router.post('/api/sms/login', controller.auth.login);
  router.resources('course', '/api/course', app.controller.course);
  router.resources('chapter', '/api/chapter', app.controller.chapter);
  router.resources('section', '/api/section', app.controller.section);
  router.post('/api/chapter/sort', controller.chapter.sort);
  router.post('/api/section/sort', controller.section.sort);
  router.get('/api/qiniu/token', controller.qiniu.token);
  router.post('/api/notification/feishu', controller.notification.feishu);
};
