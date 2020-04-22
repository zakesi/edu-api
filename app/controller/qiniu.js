'use strict';

const Controller = require('egg').Controller;

class qiniuController extends Controller {
  async token() {
    const { ctx } = this;
    const { token, domain } = await this.service.qiniu.token();
    ctx.body = { error_code: 0, data: { token, domain } };
  }
}

module.exports = qiniuController;
