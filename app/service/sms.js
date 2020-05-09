'use strict';

const Service = require('egg').Service;
class smsService extends Service {
  async verify (phone) {
    const sms = await ctx.model.SmsLog.findOne({
      where: {
        phone,
        created_at: {
          [Op.gt]: new Date(new Date() - 10 * 60 * 1000),
        },
      },
      order: [[ 'id', 'DESC' ]],
    });

    if (!sms) {
      ctx.body = { error_code: 1, message: '请获取验证码' };
      return;
    }

    if (sms.code !== code) {
      ctx.body = { error_code: 1, message: '验证码错误' };
      return;
    }

    await ctx.model.SmsLog.update({
      status: 1,
    }, {
      where: { id: sms.id },
    });
  }
}

module.exports = smsService;
