'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class zhiyeService extends Service {
  async show(id) {
    return await this.ctx.model.Zhiye.findByPk(id, {
      include: [{
        model: this.ctx.model.ZhiyePath,
        as: 'zhiye_paths',
        attributes: [ 'id', 'name', 'sort', 'description' ],
        include: [{
          model: this.ctx.model.Course,
          as: 'courses',
          attributes: [ 'id', 'name'],
        }],
      }],
      order: [
        [ this.ctx.model.ZhiyePath, 'sort', 'asc' ],
        [ this.ctx.model.ZhiyePath,
          this.ctx.model.Course,
          this.ctx.model.ZhiyeCourse, 'sort', 'asc' ],
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
    const data = await this.ctx.model.Zhiye.findAndCountAll(query);
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
    const zhiye = await ctx.model.zhiye.findByPk(id);
    if (!zhiye) {
      ctx.body = { error_code: 1, message: 'no zhiye' };
      return;
    }

    await ctx.model.ZhiyeCourse.destroy({
      where: {
        where: {
          zhiye_id: zhiye.id,
        },
      },
    });
    await ctx.model.ZhiyePath.destroy({
      where: {
        zhiye_id: zhiye.id,
      },
    });
    await zhiye.destroy();
    return {
      zhiye_id: id,
    };
  }
}

module.exports = zhiyeService;