'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 登录
  router.post('/api/sms/send', controller.auth.sms);
  router.post('/api/sms/login', controller.auth.login);
  // 课程
  router.resources('course', '/api/course', app.controller.course);
  router.resources('chapter', '/api/chapter', app.controller.chapter);
  router.resources('section', '/api/section', app.controller.section);
  router.post('/api/chapter/sort', controller.chapter.sort);
  router.post('/api/section/sort', controller.section.sort);
  // 职业
  router.resources('zhiye', '/api/zhiye', app.controller.zhiye);
  router.resources('zhiye_path', '/api/zhiye/path', app.controller.zhiyePath);
  router.resources('zhiye_course', '/api/zhiye/course', app.controller.zhiyeCourse);
  router.post('/api/zhiye/path/sort', app.controller.zhiyePath.sort);
  router.post('/api/zhiye/course/sort', app.controller.zhiyeCourse.sort);
  // 公司
  router.resources('company', '/api/company', app.controller.company);
  // 项目
  router.resources('project', '/api/project', app.controller.project);
  router.resources('version', '/api/version', app.controller.version);
  router.resources('story', '/api/story', app.controller.story);
  router.resources('task', '/api/task', app.controller.task);
  router.post('/api/project/version/sort', app.controller.version.sort);
  router.post('/api/project/story/sort', app.controller.story.sort);
  router.post('/api/project/task/sort', app.controller.task.sort);
  // 技能管理
  router.resources('stack', '/api/stack', app.controller.stack);
  router.resources('skill_question', '/api/skill/question', app.controller.skillQuestion);
  // 服务
  router.get('/api/qiniu/token', controller.qiniu.token);
  router.post('/api/notification/feishu', controller.notification.feishu);
};
