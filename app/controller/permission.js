'use strict';

const Controller = require('egg').Controller;

class PermissionController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await this.ctx.model.PermissionGroup.findAll({
      include: [{
        model: this.ctx.model.Permission,
      }],
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
}

module.exports = PermissionController;