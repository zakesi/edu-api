'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  short_name: 'string',
  slogan: 'string',
  code: 'string',
  introduction: 'string',
  contact_name: 'string',
  contact_phone: 'string',
  image_url: 'string',
};

class CompanyController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.company.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const company = await this.ctx.model.Company.findByPk(id);
    ctx.body = { error_code: 0, data: { company }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, short_name, slogan, code, introduction, contact_name, contact_phone, image_url } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const company = await ctx.model.Company.create({
      name, short_name, slogan, code, introduction, contact_name, contact_phone, image_url,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: company.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, short_name, slogan, code, introduction, contact_name, contact_phone, image_url } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Company.update({
      name, short_name, slogan, code, introduction, contact_name, contact_phone, image_url,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.service.company.destroy(id);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = CompanyController;
