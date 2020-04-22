/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584518201746_3513';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get('origin'),
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: { enable: false },
  };

  config.jwt = {
    secret: 'hello,jiker!',
  };

  config.qiniu = {
    accessKey: 'xxx',
    secretKey: 'xxx',
    bucket: 'vip-assets',
    domain: 'vip-assets.jiker.com',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
