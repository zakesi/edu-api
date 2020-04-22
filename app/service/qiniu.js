'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

class qiniuService extends Service {
  async token() {
    const { app } = this;
    const accessKey = app.config.qiniu.accessKey;
    const secretKey = app.config.qiniu.secretKey;
    const domain = app.config.qiniu.domain;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: app.config.qiniu.bucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
      callbackBodyType: 'application/json',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return {
      domain,
      token: uploadToken
    }
  }
}

module.exports = qiniuService;
