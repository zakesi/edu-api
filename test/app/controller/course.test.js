'use strict';

const { assert, app } = require('egg-mock/bootstrap');
describe('test/app/service/course.test.js', () => {
  it('GET /api/course', async () => {
    await app.factory.createMany('course', 3);
    const res = await app.httpRequest().get('/api/course?page_size=2');
    assert(res.status === 200);
    assert(res.body.data.rows.length === 2);
  });
  it('GET /api/course/:id', async () => {
    const course = await app.factory.create('course');
    const res = await app.httpRequest().get(`/api/course/${course.id}`);
    assert(res.status === 200);
    assert(res.body.data.course.name === course.name);
  });
  it('POST /api/course', async () => {
    const res = await app.httpRequest().post('/api/course')
      .send({
        name: 'JavaScript',
        short_name: 'JavaScript 基础',
        tips: 'JavaScript 基础课程',
        image_url: 'https://www.xxx.com',
        description: 'JavaScript can do everything',
        status: 0,
      });
    assert(res.status === 200);
    const get_res = await app.httpRequest().get(`/api/course/${res.body.data.id}`);
    assert(get_res.status === 200);
    assert(get_res.body.data.course.name === 'JavaScript');
  });
  it('DELETE /api/course', async () => {
    const course = await app.factory.create('course');
    const res = await app.httpRequest().delete(`/api/course/${course.id}`);
    assert(res.status === 200);
  });
});
