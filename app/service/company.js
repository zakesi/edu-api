'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class CompanyService extends Service {
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
    const data = await this.ctx.model.Company.findAndCountAll(query);
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
    const company = await ctx.model.Company.findByPk(id);
    if (!company) {
      return ctx.body = { error_code: 1, message: 'no company' };
    }

    await company.destroy();

    return {
      id: id,
    };
  }
}

module.exports = CompanyService;