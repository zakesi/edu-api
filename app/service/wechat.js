'use strict';

const Service = require('egg').Service;
const { Wechat } = require("wechat-jssdk");
const wx = new Wechat({
  wechatRedirectUrl: process.env.WECHAT_REDIRECT_URL,
  appId: process.env.WECHAT_WEB_APPID,
  appSecret: process.env.WECHAT_WEB_SECRET,
  miniProgram: {
    appId: process.env.WECHAT_MINIPROGRAM_APPID,
    appSecret: process.env.WECHAT_MINIPROGRAM_SECRET
  }
});

class wechatService extends Service {
  // PC 扫码登录地址
  async oAuthWebUrl () {
    const { app, ctx } = this;
    const appId = app.config.wechat.web.appid;
    const redirectUrl = ctx.query.redirect_url || app.config.wechat.web.redirectUrl;
    const wechatReqUrl = "https://open.weixin.qq.com/connect/qrconnect";
    const wechatQuery = `appid=${appId}&redirect_uri=${redirectUrl}`;
    const wechatState =
      "response_type=code&scope=snsapi_login&state=born2code#wechat_redirect";
    return `${wechatReqUrl}?${wechatQuery}&${wechatState}`;
  }
  // PC 扫码登录
  async oAuthWeb (code) {
    const userInfo = await wx.oauth.getUserInfo(code);
    const { app } = this;
    return {
      appid: app.config.wechat.web.appid,
      openid: userInfo.openid,
      unionid: userInfo.unionid,
      nickname: userInfo.nickname,
      avatar_url: userInfo.headimgurl,
      gender: userInfo.sex,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city
    };
  }
  // 小程序登录
  async oAuthMini (code, iv, encryptedData) {
    const { app } = this;
    const sessionInfo = await wx.miniProgram.getSession(code);
    const sessionKey = sessionInfo.session_key;
    const userInfo = await wx.miniProgram.decryptData(
      encryptedData,
      iv,
      sessionKey
    );
    return {
      appid: app.config.wechat.miniprogram.appid,
      openid: userInfo.openId,
      unionid: userInfo.unionId,
      nickname: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      session_key: sessionKey
    };
  }
  // 获取 sessionInfo
  async getSession (code) {
    const sessionInfo = await wx.miniProgram.getSession(code);
    return sessionInfo;
  }
  // 获取手机号
  async getPhoneNumber (sessionKey, iv, encryptedData) {
    const phoneInfo = await wx.miniProgram.decryptData(
      encryptedData,
      iv,
      sessionKey
    );
    return phoneInfo.purePhoneNumber;
  }
  // 登录注册并获取 token
  async token(userInfo) {
    const { ctx } = this;
    const unionid = userInfo.unionid;
    const findOrCreateUser = await ctx.model.User.findOrCreate({
      where: { unionid },
      defaults: { 
        sex: userInfo.gender,
        name: userInfo.nickname,
        unionid: userInfo.unionid,
        avatar_url: userInfo.avatar_url,
        visit_at: new Date(),
        created_at: new Date(),
      },
    });

    const user = findOrCreateUser[0];
    const isCreate = findOrCreateUser[1];
    if (!isCreate) {
      await user.update({ visit_at: new Date() });
    }
    const token = await ctx.service.jwt.sign(user.id);
    return token
  }
}

module.exports = wechatService;
