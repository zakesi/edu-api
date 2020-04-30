'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  project_id: 'number',
  version_id: 'number',
  story_id: 'number',
  sort: 'number',
};

class taskController extends Controller {
  async create() {
    const { ctx } = this;
    const { project_id, version_id, story_id, name, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const task = await ctx.model.Task.create({
      project_id, version_id, story_id, name, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: task.id }, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const task = await ctx.model.Task.findByPk(id);
    ctx.body = { error_code: 0, data: { task }, message: 'success' };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, level, content, platform } = ctx.request.body;
    ctx.validate({
      name: 'string'
    }, ctx.request.body);
    await ctx.model.Task.update({
      name, level, content, platform,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const task = await ctx.model.Task.findByPk(id);
    await task.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { tasks } = ctx.request.body;
    ctx.validate({
      tasks: 'array',
    }, ctx.request.body);
    const updateDatas = tasks.map(async (taskId, index) => {
      return await ctx.model.Task.update({
        sort: index,
      }, {
        where: {
          id: taskId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = taskController;
