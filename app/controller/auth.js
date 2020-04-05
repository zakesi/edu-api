'use strict';

const Controller = require('egg').Controller;
const { Op } = require('sequelize');

const smsRule = {
  phone: { type: 'string', required: true, message: '请输入手机号' },
  code: { type: 'string', required: true, message: '请输入验证码' },
};

class authController extends Controller {
  async sms() {
    const { ctx } = this;
    const code = Math.random().toString().slice(2, 7);
    const { phone } = ctx.request.body;
    ctx.validate({
      phone: smsRule.phone,
    }, ctx.request.body);
    const sms = await ctx.model.SmsLog.create({
      code,
      phone,
      status: 0,
      template: 'SMS_173660228',
      content: `验证码${code}，您正在登录，若非本人操作，请勿泄露。`,
    });
    ctx.body = { error_code: 0, data: { code, id: sms.id } };
  }
  async login() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);

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

    const user = await ctx.model.User.findOrCreate({
      where: { phone },
      defaults: { phone, visit_at: new Date() },
    });

    const userInfo = user[0];
    const isCreate = user[1];

    if (!isCreate) {
      await userInfo.update({ visit_at: new Date() });
    }

    const token = await ctx.service.jwt.sign(userInfo.id);
    ctx.body = { error_code: 0, message: 'success', data: {
      userInfo,
      token,
    } };
  }
}

module.exports = authController;
