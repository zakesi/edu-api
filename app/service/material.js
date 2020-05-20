'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class MaterialService extends Service {
  async show(id) {
    const { ctx } = this;
    const material = await ctx.model.Material.findByPk(id);
    return material
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
    const data = await this.ctx.model.Material.findAndCountAll(query);
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
    const material = await ctx.model.Material.findByPk(id);
    console.log(material, "material")
    if (!material) {
      ctx.body = { error_code: 1, message: 'no material' };
      return;
    }
    await material.destroy();
    return {
      message: 'success'
    };
  }
}

module.exports = MaterialService;
