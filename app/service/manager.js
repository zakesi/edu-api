'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');
const _ = require('lodash');

class managerService extends Service {
  async pagination({ limit = 20, page = 1, where = {} }) {
    limit = Number(limit);
    page = Number(page);
    where = _.pickBy(where, Boolean);
    const offset = (page - 1) * limit;
    const query = {
      limit, offset, where,
      order: [
        [ 'created_at', 'desc' ],
        [ 'id', 'desc' ],
      ],
      include: [{
        model: this.ctx.model.Role,
      }],
    };
    const data = await this.ctx.model.Manager.findAndCountAll(query);
    return {
      rows: data.rows,
      pagination: {
        total: data.count,
        page_size: limit,
        current_page: page,
      },
    };
  }
}

module.exports = managerService;