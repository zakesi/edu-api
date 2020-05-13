'use strict';

const Controller = require('egg').Controller;

class wechatController extends Controller {
  async oAuthWebUrl () {
    const { ctx } = this;
    const wechatOAuthUrl = await ctx.service.wechat.oAuthWebUrl();
    ctx.body = { error_code: 0, data: { redirect: wechatOAuthUrl }, message: 'success' }
  }
  async oAuthWeb () {
    const { ctx } = this;
    const code = ctx.query.code;
    if(!code) {
      return ctx.body = { error_code: 1, message: 'code necessary'}
    }
    const userInfo = await ctx.service.wechat.oAuthWeb(code);
    const token = await ctx.service.wechat.token(userInfo);
    ctx.body = { error_code: 0, data: { userInfo, token }, message: 'success' }
  }
  async oAuthMini () {
    const { ctx } = this;
    const code = ctx.body.code;
    const iv = ctx.body.iv;
    const encrypted_data = ctx.body.encrypted_data;
    const userInfo = await ctx.service.wechat.oAuthMini(code, iv, encrypted_data);
    const token = await ctx.service.wechat.token(userInfo);
    ctx.body = { error_code: 0, data: { userInfo, token }, message: 'success' }
  }
  async updateSessionKey () {
    const { ctx } = this;
    const code = ctx.body.code;
    const id = ctx.locals.user_id;
    const sessionInfo = await ctx.service.wechat.getSession(code);
    const sessionKey = sessionInfo.session_key;
    await ctx.model.User.update({
      session_key: sessionKey,
      updated_at: new Date(),
    }, {
      where: { id }
    });
    ctx.body = { error_code: 0, message: 'success' }
  }
  async bindPhoneNumber () {
    const { ctx } = this;
    const iv = ctx.body.iv;
    const encrypted_data = ctx.body.encrypted_data;
    const id = ctx.locals.user_id;

    const user = await ctx.model.User.findByPk(id);
    const sessionKey = user.session_key;
    const phone = await ctx.service.wechat.getPhoneNumber(
      sessionKey,
      iv,
      encrypted_data
    );
    ctx.body = { error_code: 0, data: { phone } }
  }
}

module.exports = wechatController;
