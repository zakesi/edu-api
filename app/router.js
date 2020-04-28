'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/version', controller.version.index);
  // 登录
  router.post('/api/sms/send', controller.auth.sms);
  router.post('/api/sms/login', controller.auth.login);
  // 课程
  router.resources('course', '/api/course', app.controller.course);
  router.resources('chapter', '/api/chapter', app.controller.chapter);
  router.resources('section', '/api/section', app.controller.section);
  router.post('/api/chapter/sort', controller.chapter.sort);
  router.post('/api/section/sort', controller.section.sort);
  // 职业路径
  router.resources('zhiye', '/api/zhiye', app.controller.zhiye);
  router.resources('zhiye_path', '/api/zhiye/path', app.controller.zhiyePath);
  router.resources('zhiye_course', '/api/zhiye/course', app.controller.zhiyeCourse);
  router.post('/api/zhiye/path/sort', app.controller.zhiyePath.sort);
  router.post('/api/zhiye/course/sort', app.controller.zhiyeCourse.sort);
  // 服务
  router.get('/api/qiniu/token', controller.qiniu.token);
  router.post('/api/notification/feishu', controller.notification.feishu);
};
