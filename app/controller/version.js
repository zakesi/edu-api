'use strict';

const Controller = require('egg').Controller;

class versionController extends Controller {
  async index() {
    const { ctx, config } = this;
    ctx.body = { error_code: 0, data: { version: 'v1', data: config.sequelize } };
  }
}

module.exports = versionController;
