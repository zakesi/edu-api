'use strict';

const Controller = require('egg').Controller;

const createRule = {
  course_id: 'number',
  name: 'string',
  sort: 'number',
};

class ChapterController extends Controller {
  async create() {
    const { ctx } = this;
    const { course_id, name, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const chapter = await ctx.model.Chapter.create({
      course_id, name, sort,
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
    await ctx.model.Chapter.update({
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
    const chapter = await ctx.model.Chapter.findByPk(id);
    await ctx.model.Section.destroy({
      where: {
        chapter_id: id,
      },
    });
    await chapter.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { chapters } = ctx.request.body;
    ctx.validate({
      chapters: 'array',
    }, ctx.request.body);
    const updateDatas = chapters.map(async (chapterId, index) => {
      return await ctx.model.Chapter.update({
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

module.exports = ChapterController;
