'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');
class smsService extends Service {
  async verify (phone, code) {
    const { ctx } = this;
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
      return { error_code: 1, message: '请获取验证码' };
      return;
    }

    if (sms.code !== code) {
      return { error_code: 1, message: '验证码错误' };
    }


    await ctx.model.SmsLog.update({
      status: 1,
    }, {
      where: { id: sms.id },
    });

    return { error_code: 0, message: 'success'}
  }
}

module.exports = smsService;
