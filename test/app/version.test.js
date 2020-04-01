'use strict';

const { app } = require('egg-mock/bootstrap');
  it('should GET /api/version', () => {
    return app.httpRequest()
      .get('/api/version')
      .expect({
        error_code: 0,
        version: 'v1'
      })
      .expect(200);
  });
});
