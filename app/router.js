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
};
