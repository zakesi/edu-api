'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class AdvertiseService extends Service {
  async show(id) {
    const { ctx } = this;
    const advertise = await ctx.model.Advertise.findByPk(id);
    return advertise
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
    const data = await this.ctx.model.Advertise.findAndCountAll(query);
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
    const advertise = await ctx.model.Advertise.findByPk(id);
    console.log(advertise, "advertise")
    if (!advertise) {
      ctx.body = { error_code: 1, message: 'no advertise' };
      return;
    }
    await advertise.destroy();
    return {
      message: 'success'
    };
  }
}

module.exports = AdvertiseService;
