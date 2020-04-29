'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  project_id: 'number',
  version_id: 'number',
  sort: 'number',
};

class storyController extends Controller {
  async create() {
    const { ctx } = this;
    const { project_id, version_id, name, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const chapter = await ctx.model.Story.create({
      project_id, version_id, name, sort,
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
    await ctx.model.Story.update({
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
    const story = await ctx.model.Story.findByPk(id);
    await ctx.model.Task.destroy({
      where: {
        story_id: id,
      },
    });
    await story.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { stories } = ctx.request.body;
    ctx.validate({
      stories: 'array',
    }, ctx.request.body);
    const updateDatas = stories.map(async (sotryId, index) => {
      return await ctx.model.Story.update({
        sort: index,
      }, {
        where: {
          id: sotryId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = storyController;
