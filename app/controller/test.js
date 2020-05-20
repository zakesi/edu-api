'use strict';

const Controller = require('egg').Controller;

class testController extends Controller {
  async index() {
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = testController;
