'use strict';

const Controller = require('egg').Controller;
const smsRule = {
  phone: { type: 'string', required: true, message: '请输入手机号' },
  code: { type: 'string', required: true, message: '请输入验证码' },
};

class userController extends Controller {
  async userInfo() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const userInfo = await ctx.model.User.findByPk(id, {
      attributes: [
        'id', 'phone', 'name', 'real_name', 
        'sex', 'birthday', 'introduction',
        'avatar_url', 'unionid',
      ]
    });
    ctx.body = { error_code: 0, data: { userInfo }, message: 'success' };
  }
  async updateUserInfo() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const { name, real_name, sex, birthday, introduction } = ctx.request.body;
    await ctx.model.User.update({
      name, real_name, sex, birthday, introduction,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async bindPhone() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);
    const verify = await ctx.service.sms.verify(phone, code);
    if(verify.error_code) {
      return ctx.body = verify
    }
    await ctx.model.User.update({
      phone: phone
    },{
      where: { id }
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async bindWechat() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const code = ctx.query.code;
    if(!code) {
      return ctx.body = { error_code: 1, message: 'code necessary'}
    }
    const userInfo = await ctx.service.wechat.oAuthWeb(code);
    const unionid = userInfo.unionid;
    const hasUser = await ctx.model.User.findOne({
      where: { unionid }
    })
    if(hasUser) {
      return ctx.body = { error_code: 1, message: '该微信号已绑定，请解绑后再进行绑定'}
    }

    await ctx.model.User.update({
      unionid: unionid
    }, {
      where: { id }
    })

    ctx.body = { error_code: 0, data: { unionid }, message: 'success' }
  }
  async unBindWechat() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    await ctx.model.User.update({
      unionid: ''
    }, {
      where: { id }
    })
    ctx.body = { error_code: 0, message: 'success' }
  }
}

module.exports = userController;
