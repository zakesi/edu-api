'use strict';

const Controller = require('egg').Controller;

const createRule = {
  stem: 'string',
  option: 'string',
  stack_id: 'number',
  level: 'number',
  currect: 'number',
};

class skillQuestionController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await ctx.service.skillQuestion.pagination({
      limit: ctx.query.page_size,
      page: ctx.query.current_page,
    });
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const question = await this.ctx.model.SkillQuestion.findByPk(id);
    ctx.body = { error_code: 0, data: { question }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { stem, option, stack_id, level, currect } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const stack = await ctx.model.SkillQuestion.create({
      stem, option, stack_id, level, currect,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: stack.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { stem, option, stack_id, level, currect } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.SkillQuestion.update({
      stem, option, stack_id, level, currect,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    await ctx.model.SkillQuestion.destroy({
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = skillQuestionController;
