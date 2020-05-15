'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
  async userInfo() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const userInfo = await ctx.model.User.findByPk(id);
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
  async unBindPhone() {

  }
  async bindPhone() {
    // const { ctx } = this;
    // const id = ctx.locals.user_id;
  }
  async bindWechat() {

  }
  async unBindWechat() {
    
  }
}

module.exports = userController;
