'use strict';

const JWT = require('jsonwebtoken');

module.exports = options => {
  return async (ctx, next) => {
    const { app } = ctx;
    ctx.locals.jwtOptions = options;
    console.log(options)
    const token = ctx.header.authorization
      ? ctx.headers.authorization.split(' ')[1]
      : '';
    console.log(app.config.jwt,111111)
    if (token) {
      const decoded = JWT.verify(token, app.config.jwt.secret);
      ctx.locals.user_id = decoded.user_id;
      await next();

      // JWT.verify(token, ctx.config.JWT_SECRET, function(err, decoded) {
      //   if(!err) {
      //     ctx.locals.user_id = decoded.user_id;
      //     await next();
      //   }else {
      //     ctx.status = 401;
      //     ctx.body = {
      //       error_code: 1,
      //       message :'Auth Expired'
      //     }
      //     return
      //   }
      // });
    } else {
      ctx.status = 401;
      ctx.body = {
        error_code: 1,
        message: 'Auth Empty',
      };
      return;
    }
  };
};
