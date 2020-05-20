'use strict';

const Controller = require('egg').Controller;

const createRule = {
  chapter_id: 'number',
  name: 'string',
  content: 'string',
  video_url: 'string',
  sort: 'number',
};

class SectionController extends Controller {
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const section = await ctx.model.Section.findByPk(id);
    ctx.body = { error_code: 0, data: { section }, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { chapter_id, name, sort } = ctx.request.body;
    ctx.validate({
      chapter_id: createRule.chapter_id,
      name: createRule.name,
      sort: createRule.sort,
    }, ctx.request.body);
    const section = await ctx.model.Section.create({
      chapter_id, name, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { id: section.id }, message: 'success' };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, content, video_url } = ctx.request.body;
    ctx.validate({
      name: createRule.name,
    }, ctx.request.body);
    await ctx.model.Section.update({
      name, content, video_url,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const section = await ctx.model.Section.findByPk(id);
    await section.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { sections, chapter_id } = ctx.request.body;
    ctx.validate({
      sections: 'array',
      chapter_id: 'number',
    }, ctx.request.body);
    const updateDatas = sections.map(async (chapterId, index) => {
      return await ctx.model.Section.update({
        chapter_id,
        sort: index,
      }, {
        where: {
          id: chapterId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = SectionController;
