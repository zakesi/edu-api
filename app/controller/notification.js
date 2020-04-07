'use strict';

const Controller = require('egg').Controller;

class NotificationController extends Controller {
  async feishu() {
    const { ctx } = this;
    const { title, text } = ctx.request.body;
    ctx.validate({
      title: { type: 'string', required: true },
      text: { type: 'string', required: true },
    }, ctx.request.body);
    
    const feishu = await this.service.feishu.botHook('d8c28bd0825d4ca28415f4c5a23732cb', {
      title, text
    })

    ctx.body = {
      error_code: 0,
      message: 'success',
      data: feishu.data,
    };
  }
}

module.exports = NotificationController;
