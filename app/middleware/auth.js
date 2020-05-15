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
        await next();
    } catch (e) {
        ctx.status = 401;
        console.log(e)
        return ctx.body = { error_code: 1, message: e.message };
    }
  };
};
