'use strict';

const Controller = require('egg').Controller;

const createRule = {
  zhiye_id: 'number',
  course_id: 'number',
  path_id: 'number',
  sort: 'number',
};

class ZhiyePathController extends Controller {
  async create() {
    const { ctx } = this;
    const { zhiye_id, path_id, course_id, sort } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);

    const course = await ctx.model.Course.findByPk(course_id);
    if(!course) {
      return ctx.body = { error_code: 1, message: '没有此课程' }
    }
    const zhiyeCourseHas = await ctx.model.ZhiyeCourse.findOne({
      where: {
        course_id,
        zhiye_id 
      }
    })
    if(zhiyeCourseHas) {
      return ctx.body = { error_code: 1, message: '该职业已经绑定过此课程' }
    }
    const zhiyeCourse = await ctx.model.ZhiyeCourse.create({
      zhiye_id, path_id, course_id, sort,
      created_at: new Date(),
    });
    ctx.body = { error_code: 0, data: { zhiye_id: zhiyeCourse.id, course }, message: 'success' };
  }
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const course = await ctx.model.ZhiyeCourse.findByPk(id);
    await course.destroy();
    ctx.body = { error_code: 0, message: 'success' };
  }
  async sort() {
    const { ctx } = this;
    const { courses, path_id } = ctx.request.body;
    ctx.validate({
      courses: 'array',
    }, ctx.request.body);
    const updateDatas = courses.map(async (zhiyeCoursesId, index) => {
      return await ctx.model.ZhiyeCourse.update({
        path_id,
        sort: index,
      }, {
        where: {
          id: zhiyeCoursesId,
        },
      });
    });
    await Promise.all(updateDatas);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ZhiyePathController;
