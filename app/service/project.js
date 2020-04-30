'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class projectService extends Service {
  async show(id) {
    return await this.ctx.model.Project.findByPk(id, {
      include: [{
        model: this.ctx.model.Version,
        as: 'versions',
        attributes: [ 'id', 'name', 'sort' ],
        include: [{
          model: this.ctx.model.Story,
          as: 'stories',
          attributes: [ 'id', 'name', 'sort'],
          include: [{
            model: this.ctx.model.Task,
            as: 'tasks',
            attributes: [ 'id', 'name', 'sort'],
          }],
        }],
      }],
      order: [
        [ this.ctx.model.Version, 'sort', 'asc' ],
        [ this.ctx.model.Version,
          this.ctx.model.Story, 'sort', 'asc' ],
        [ this.ctx.model.Version,
          this.ctx.model.Story,
          this.ctx.model.Task, 'sort', 'asc' ],
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
    const data = await this.ctx.model.Project.findAndCountAll(query);
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
    const project = await ctx.model.Project.findByPk(id);

    if (!project) {
      ctx.body = { error_code: 1, message: 'no project' };
      return;
    }

    await ctx.model.Version.destroy({
      where: {
         project_id: id,
      },
    });
    await ctx.model.Story.destroy({
      where: {
        project_id: id,
      },
    });
    await ctx.model.Task.destroy({
      where: {
        project_id: id,
      },
    });
    await project.destroy();
    return {
      project_id: id,
    };
  }
}

module.exports = projectService;