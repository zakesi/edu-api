'use strict';

const { app } = require('egg-mock/bootstrap');
describe('/api/version', () => {
  it('should GET v1', () => {
    return app.httpRequest()
      .get('/api/version')
      .expect({ error_code: 0, data: { version: 'v1' } })
      .expect(200);
  });
});
