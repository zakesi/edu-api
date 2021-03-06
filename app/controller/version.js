'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  project_id: 'number',
  sort: 'number',
};

class versionController extends Controller {
  async create() {
    const { ctx } = this;
    const { project_id, name, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const chapter = await ctx.model.Version.create({
      project_id, name, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: chapter.id }, message: 'success' };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name } = ctx.request.body;
    ctx.validate({
      name: 'string'
    }, ctx.request.body);
    await ctx.model.Version.update({
      name,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const chapter = await ctx.model.Version.findByPk(id);
    await ctx.model.Story.destroy({
      where: {
        version_id: id,
      },
    });
    await ctx.model.Task.destroy({
      where: {
        version_id: id,
      },
    });
    await chapter.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { versions } = ctx.request.body;
    ctx.validate({
      versions: 'array',
    }, ctx.request.body);
    const updateDatas = versions.map(async (versionId, index) => {
      return await ctx.model.Version.update({
        sort: index,
      }, {
        where: {
          id: versionId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = versionController;
