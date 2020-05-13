'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      let message = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 微信报错
      message = message || err.errmsg;

      ctx.body = { message };

      if (status === 422) {
        ctx.body = {
          error_code: 1,
          message: `${err.errors[0].field} ${err.errors[0].message}`,
          data: err.errors.map(data => {
            return `${data.field} ${data.message}`;
          }),
        };
      }
      ctx.status = status;
    }
  };
};
