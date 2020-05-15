'use strict';

const JWT = require('jsonwebtoken');
module.exports = permission => {
  return async (ctx, next) => {
    const { app } = ctx;
    const token = ctx.header.authorization
      ? ctx.headers.authorization.split(' ')[1]
      : '';

    // 没有 token 返回 401
    if(!token) {
      ctx.status = 401;
      return ctx.body = { error_code: 1, message: 'Auth Empty' };
    }

    try {
        const decoded = JWT.verify(token, app.config.jwt.secret);
        const user_id = decoded.user_id;
        ctx.locals.user_id = user_id;
        const manager = await ctx.model.Manager.findByPk(user_id);
        if(!manager) {
            ctx.status = 403;
            return ctx.body = { error_code: 1, message: 'No Auth Manager' };
        }

        const permissions = await ctx.model.RolePermission.findAll({
            where: { role_id: manager.role_id }
        })
        const permissionSlugs = (permissions || []).map( data => data.permission_slug );
        ctx.locals.permissions = permissionSlugs;
        const hasPermission = permission ? permissionSlugs.includes(permission) : true;
        if(!hasPermission) {
            ctx.status = 403;
            return ctx.body = { error_code: 1, message: 'No Auth Permission' };
        }
        await next();
    } catch (e) {
        ctx.status = 401;
        return ctx.body = { error_code: 1, message: e.message };
    }
  };
};
