'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 课程
  router.resources('course', '/api/admin/course', app.controller.course);
  router.resources('chapter', '/api/admin/chapter', app.controller.chapter);
  router.resources('section', '/api/admin/section', app.controller.section);
  router.post('/api/admin/chapter/sort', controller.chapter.sort);
  router.post('/api/admin/section/sort', controller.section.sort);
  // 职业
  router.resources('zhiye', '/api/admin/zhiye', app.controller.zhiye);
  router.resources('zhiye_path', '/api/admin/zhiye/path', app.controller.zhiyePath);
  router.resources('zhiye_course', '/api/admin/zhiye/course', app.controller.zhiyeCourse);
  router.post('/api/admin/zhiye/path/sort', app.controller.zhiyePath.sort);
  router.post('/api/admin/zhiye/course/sort', app.controller.zhiyeCourse.sort);
  // 公司
  router.resources('company', '/api/admin/company', app.controller.company);
  // 项目
  router.resources('project', '/api/admin/project', app.controller.project);
  router.resources('version', '/api/admin/version', app.controller.version);
  router.resources('story', '/api/admin/story', app.controller.story);
  router.resources('task', '/api/admin/task', app.controller.task);
  router.post('/api/admin/project/version/sort', app.controller.version.sort);
  router.post('/api/admin/project/story/sort', app.controller.story.sort);
  router.post('/api/admin/project/task/sort', app.controller.task.sort);
  // 技能管理
  router.resources('stack', '/api/admin/stack', app.controller.stack);
  router.resources('skill_question', '/api/admin/skill/question', app.controller.skillQuestion);
  // 权限
  router.resources('role', '/api/admin/role', app.controller.role);
  router.get('/api/admin/permission', app.controller.permission.index);
  router.resources('manager' ,'/api/admin/manager', app.controller.manager);
};