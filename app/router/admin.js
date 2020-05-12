'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const Auth = middleware.authAdmin;
  // 登陆
  router.post('/api/admin/sms/send', controller.auth.sms);
  router.post('/api/admin/sms/login', controller.auth.adminLogin);
  router.get('/api/admin/auth/permissions', Auth(), controller.auth.permissions);
  // 课程
  router.resources('course', '/api/admin/course', Auth('course.index'), controller.course);
  router.resources('chapter', '/api/admin/chapter', Auth('course.index'), controller.chapter);
  router.resources('section', '/api/admin/section',Auth('course.index'),  controller.section);
  router.post('/api/admin/chapter/sort', Auth('course.index'), controller.chapter.sort);
  router.post('/api/admin/section/sort', Auth('course.index'), controller.section.sort);
  // 职业
  router.resources('zhiye', '/api/admin/zhiye', Auth('zhiye.index'), controller.zhiye);
  router.resources('zhiye_path', '/api/admin/zhiye/path', Auth('zhiye.index'), controller.zhiyePath);
  router.resources('zhiye_course', '/api/admin/zhiye/course', Auth('zhiye.index'), controller.zhiyeCourse);
  router.post('/api/admin/zhiye/path/sort', Auth('zhiye.index'), controller.zhiyePath.sort);
  router.post('/api/admin/zhiye/course/sort', Auth('zhiye.index'), controller.zhiyeCourse.sort);
  // 公司
  router.resources('company', '/api/admin/company', Auth('company.index'), controller.company);
  // 项目
  router.resources('project', '/api/admin/project', Auth('project.index'), controller.project);
  router.resources('version', '/api/admin/version', Auth('project.index'), controller.version);
  router.resources('story', '/api/admin/story', Auth('project.index'), controller.story);
  router.resources('task', '/api/admin/task', Auth('project.index'), controller.task);
  router.post('/api/admin/project/version/sort', Auth('project.index'), controller.version.sort);
  router.post('/api/admin/project/story/sort', Auth('project.index'), controller.story.sort);
  router.post('/api/admin/project/task/sort', Auth('project.index'), controller.task.sort);
  // 技能
  router.resources('stack', '/api/admin/stack', Auth('stack.index'), controller.stack);
  router.resources('skill_question', '/api/admin/skill/question', Auth('skill.index'), controller.skillQuestion);
  // 权限
  router.resources('role', '/api/admin/role', Auth('manager.index'), controller.role);
  router.resources('manager' ,'/api/admin/manager', Auth('manager.index'), controller.manager);
  router.get('/api/admin/permission', Auth('manager.index'), controller.permission.index);
};