/* eslint valid-jsdoc: "off" */

'use strict';
require("dotenv").config();
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
    secret: process.env.JWT_SECRET,
  };

  config.sequelize = {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };

  config.qiniu = {
    accessKey: process.env.QINIU_ACCESSKEY,
    secretKey: process.env.QINIU_SECRETKEY,
    bucket: process.env.QINIU_BUCKET,
    domain: process.env.QINIU_DOMAIN,
  };

  config.wechat = {
    web: {
      redirectUrl: process.env.WECHAT_REDIRECT_URL,
      appid: process.env.WECHAT_WEB_APPID,
      secret: process.env.WECHAT_WEB_SECRET,
    },
    miniprogram: {
      appid: process.env.WECHAT_MINIPROGRAM_APPID,
      secret: process.env.WECHAT_MINIPROGRAM_SECRET,
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
