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
    const code = Math.random().toString().slice(2, 8);
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
    const verify = await ctx.service.sms.verify(phone, code);
    if(verify.error_code) {
      return ctx.body = verify
    }
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
  async permissions () {
    const { ctx } = this;
    const managerId = ctx.locals.user_id;
    const manager = await this.ctx.model.Manager.findByPk(managerId);
    const role_id = manager.role_id;
    const rolePermissions = await this.ctx.model.rolePermissions.findAll({
      where: { role_id }
    })
    const permissions = rolePermissions.map( data => data.permission_slug);
    ctx.body = { error_code: 0, data: { permissions },message: 'success' };
  }
  async adminLogin() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);

    const verify = await ctx.service.sms.verify(phone, code);
    if(verify.error_code) {
      return ctx.body = verify
    }

    const manager = await ctx.model.Manager.findOne({
      where: { phone },
    });
    if(!manager) {
      return ctx.body = { error_code: 1, message: '该用户员不存在，请联系管理员' };
    }

    const token = await ctx.service.jwt.sign(manager.id);
    ctx.body = { error_code: 0, message: 'success', data: {
      manager,
      token,
    } };
  }
}

module.exports = authController;
