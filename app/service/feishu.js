'use strict';

const Service = require('egg').Service;

class feishuService extends Service {
  async botHook(id, { title, text }) {
    const webHookUrl = 'https://open.feishu.cn/open-apis/bot/hook/' + id;
    return await this.ctx.curl(webHookUrl, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: { title, text },
    });
  }
}

module.exports = feishuService;
