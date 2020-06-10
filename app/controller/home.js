'use strict';

const Controller = require('egg').Controller;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Hi, Jiker!';
  }
}

module.exports = HomeController;
