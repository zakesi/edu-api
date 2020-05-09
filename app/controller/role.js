'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  description: 'string',
};

class roleController extends Controller {
  async index() {
    const { ctx } = this;
    const datas = await this.ctx.model.Role.findAll();
    ctx.body = { error_code: 0, data: datas, message: 'success' };
  }
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const role = await this.ctx.model.Role.findByPk(id, {
      include: [{
        model: this.ctx.model.RolePermission,
        attributes: [ 'permission_slug'],
      }]
    })
    if(!role) {
      ctx.body = { error_code: 1, message: 'no role' };
      return
    }
    const roleValue = role.dataValues;
    roleValue.permissions = roleValue.role_permissions.map( data => data.permission_slug);
    delete roleValue.role_permissions;
    ctx.body = { error_code: 0, data: roleValue, message: 'success' };
  }
  async create() {
    const { ctx } = this;
    const { name, description, permissions } = ctx.request.body;
    ctx.validate( createRule, ctx.request.body);
    const role = await ctx.model.Role.create({
      name, description,
      created_at: new Date(),
    });
    const permissionsValue = permissions.map(data => {
      return {
        permission_slug: data,
        role_id: role.id
      }
    })
    await ctx.model.RolePermission.bulkCreate(permissionsValue);
    ctx.body = { error_code: 0, data: { id: role.id } };
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const { name, description, permissions } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    await ctx.model.Role.update({
      name, description,
      updated_at: new Date(),
    }, {
      where: { id },
    });
    const defaultPermissions = await ctx.model.RolePermission.findAll({
      where: { role_id: id }
    })
    await ctx.model.RolePermission.destroy({
      where: { role_id: id }
    })
    const permissionsValue = permissions.map(data => {
      return {
        permission_slug: data,
        role_id: id
      }
    })
    await ctx.model.RolePermission.bulkCreate(permissionsValue);
    ctx.body = { error_code: 0, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const role = await ctx.model.Role.findByPk(id);
    await ctx.model.RolePermission.destroy({
      where: { role_id: id }
    })
    await role.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = roleController;
