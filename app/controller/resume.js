'use strict';

const Controller = require('egg').Controller;

class resumeController extends Controller {
  async showResume() {
    const { ctx } = this;
    const user_id = ctx.params.id;
    const resume = await ctx.model.Resume.findOne({
      where: { user_id },
      attributes: [
        'job', 'city', 'experience', 'capability', 'skills', 'items',
      ],
    });
    const userInfo = await ctx.model.User.findOne({
      where: { id: user_id },
      attributes: [ 'id', 'phone', 'name', 'real_name', 
      'sex', 'birthday', 'introduction',
      'avatar_url',
      ],
    });

    ctx.body = { error_code: 0, data: { resume, userInfo }, message: 'success' };
  }
  async updateResume() {
    const { ctx } = this;
    const user_id = ctx.locals.user_id;
    const { job, city, experience, capability, skills, items } = ctx.request.body;
    await ctx.model.Resume.findOrCreate({
      where: { user_id },
      defaults: {
        user_id, job, city, experience, capability, skills, items,
      },
    })
    .then(([ user, created ]) => {
      if(!created) {
        ctx.model.Resume.update({
          job, city, experience, capability, skills, items, updated_at: new Date()
        },{
          where: {user_id: user.user_id }
        })
      }
    });
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = resumeController;