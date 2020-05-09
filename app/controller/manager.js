'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  phone: 'string',
  role_id: 'number',
};

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    const { page_size, current_page, role_id, phone, name } = ctx.query;
    console.log(name)
    const datas = await this.ctx.service.manager.pagination({
      where: { role_id, phone, name },
      limit: page_size,
      page: current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, phone, role_id } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);

    const hasManager = await ctx.model.Manager.findAll({
      where: { phone }
    })

    if(hasManager) {
      return ctx.body = { error_code: 1, message: '手机已经存在' };
    }

    const manager = await ctx.model.Manager.create({
      name, phone, role_id,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: manager.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, phone, role_id } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.manager.update({
      name, phone, role_id,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const manager = await ctx.model.Manager.findByPk(id);
    await manager.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ManagerController;
