'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class courseService extends Service {
  async show(id) {
    return await this.ctx.model.Course.findByPk(id, {
      include: [{
        model: this.ctx.model.Chapter,
        as: 'chapters',
        attributes: [ 'id', 'name', 'sort' ],
        include: [{
          model: this.ctx.model.Section,
          as: 'sections',
          attributes: [ 'id', 'name', 'sort' ],
        }],
      }],
      order: [
        [ this.ctx.model.Chapter, 'sort', 'asc' ],
        [ this.ctx.model.Chapter,
          this.ctx.model.Section, 'sort', 'asc' ],
      ],
    });
  }
  async pagination({ limit = 20, page = 1 }) {
    limit = Number(limit);
    page = Number(page);
    const offset = (page - 1) * limit;
    const query = {
      limit, offset,
      order: [
        [ 'created_at', 'desc' ],
        [ 'id', 'desc' ],
      ],
    };
    const data = await this.ctx.model.Course.findAndCountAll(query);
    return {
      rows: data.rows,
      pagination: {
        total: data.count,
        page_size: limit,
        current_page: page,
      },
    };
  }
  async destroy(id) {
    const { ctx } = this;
    const course = await ctx.model.Course.findByPk(id);
    if (!course) {
      ctx.body = { error_code: 1, message: 'no course' };
      return;
    }
    const chapters = await ctx.model.Chapter.findAll({
      where: {
        course_id: course.id,
      },
    });
    const chapterIds = chapters.map(data => data.id);
    await ctx.model.Section.destroy({
      where: {
        chapter_id: {
          [Op.in]: chapterIds,
        },
      },
    });
    await ctx.model.Chapter.destroy({
      where: {
        course_id: course.id,
      },
    });
    await course.destroy();
    return {
      course_id: id,
      chapters: chapterIds,
    };
  }
}

module.exports = courseService;
