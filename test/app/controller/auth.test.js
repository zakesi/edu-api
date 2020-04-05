'use strict';

const { assert, app } = require('egg-mock/bootstrap');
describe('POST /api/sms/send', () => {
  it('请获取验证码', async () => {
    const loginRes = await app.httpRequest().post('/api/sms/login')
      .send({
        phone: '13511111112',
        code: '1234',
      });

    assert(loginRes.status === 200);
    assert(loginRes.body.error_code === 1);
    assert(loginRes.body.message === '请获取验证码');
  });

  it('验证码错误', async () => {
    const phone = '13511111111';
    const sendRes = await app.httpRequest().post('/api/sms/send')
      .send({ phone });
    assert(sendRes.status === 200);

    const loginRes = await app.httpRequest().post('/api/sms/login')
      .send({
        phone,
        code: '1234',
      });
    assert(loginRes.status === 200);
    assert(loginRes.body.error_code === 1);
    assert(loginRes.body.message === '验证码错误');
  });


  it('登录成功', async () => {
    const phone = '13511111111';
    const sendRes = await app.httpRequest().post('/api/sms/send')
      .send({ phone });
    assert(sendRes.status === 200);
    assert(sendRes.body.data.id);
    assert(sendRes.body.data.code);

    const loginRes = await app.httpRequest().post('/api/sms/login')
      .send({
        phone,
        code: sendRes.body.data.code,
      });
    assert(loginRes.status === 200);
    assert(loginRes.body.data.token);
    assert(loginRes.body.data.userInfo);
  });


});
