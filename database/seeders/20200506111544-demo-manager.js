'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('permission_groups', [
      {id: 1,name: '职业课程'},
      {id: 2,name: '项目管理'},
      {id: 3,name: '测评管理'},
      {id: 4,name: '权限管理'}
    ]);
    await queryInterface.bulkInsert('permissions', [
      { id: 1, name: '路径-列表', slug: 'zhiye.index', group_id: 1 },
      { id: 2, name: '路径-创建', slug: 'zhiye.create', group_id: 1 },
      { id: 3, name: '路径-编辑', slug: 'zhiye.update', group_id: 1 },
      { id: 4, name: '路径-删除', slug: 'zhiye.destory', group_id: 1}, 
      { id: 5, name: '课程-列表', slug: 'course.index', group_id: 1 },
      { id: 6, name: '课程-创建', slug: 'course.create', group_id: 1 },
      { id: 7, name: '课程-编辑', slug: 'course.update', group_id: 1 },
      { id: 8, name: '课程-删除', slug: 'course.destory', group_id: 1},

      { id: 9, name: '企业-列表', slug: 'company.index', group_id: 2 },
      { id: 10, name: '企业-创建', slug: 'company.create', group_id: 2 },
      { id: 11, name: '企业-编辑', slug: 'company.update', group_id: 2 },
      { id: 12, name: '企业-删除', slug: 'company.destory', group_id: 2}, 
      { id: 13, name: '项目-列表', slug: 'project.index', group_id: 2 },
      { id: 14, name: '项目-创建', slug: 'project.create', group_id: 2 },
      { id: 15, name: '项目-编辑', slug: 'project.update', group_id: 2 },
      { id: 16, name: '项目-删除', slug: 'project.destory', group_id: 2},

      { id: 17, name: '技能-列表', slug: 'stack.index', group_id: 3 },
      { id: 18, name: '技能-创建', slug: 'stack.create', group_id: 3 },
      { id: 19, name: '技能-编辑', slug: 'stack.update', group_id: 3 },
      { id: 20, name: '技能-删除', slug: 'stack.destory', group_id: 3}, 
      { id: 21, name: '题目-列表', slug: 'skill.question.index', group_id: 3 },
      { id: 22, name: '题目-创建', slug: 'skill.question.create', group_id: 3 },
      { id: 23, name: '题目-编辑', slug: 'skill.question.update', group_id: 3 },
      { id: 24, name: '题目-删除', slug: 'skill.question.destory', group_id: 3},
     
      { id: 25, name: '管理员-管理', slug: 'manager.index', group_id: 4 },
      { id: 26, name: '管理员-权限', slug: 'role.index', group_id: 4},
    ]);
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: '管理员', description: '拥有所有权限',}
    ]);
    await queryInterface.bulkInsert('role_permissions', [
      { role_id: 1 , permission_slug: 'zhiye.index' },
      { role_id: 1 , permission_slug: 'zhiye.create' },
      { role_id: 1 , permission_slug: 'zhiye.update' },
      { role_id: 1 , permission_slug: 'zhiye.destory'}, 
      { role_id: 1 , permission_slug: 'course.index' },
      { role_id: 1 , permission_slug: 'course.create' },
      { role_id: 1 , permission_slug: 'course.update' },
      { role_id: 1 , permission_slug: 'course.destory'},

      { role_id: 1 , permission_slug: 'company.index' },
      { role_id: 1 , permission_slug: 'company.create' },
      { role_id: 1 , permission_slug: 'company.update' },
      { role_id: 1 , permission_slug: 'company.destory'}, 
      { role_id: 1 , permission_slug: 'project.index' },
      { role_id: 1 , permission_slug: 'project.create' },
      { role_id: 1 , permission_slug: 'project.update' },
      { role_id: 1 , permission_slug: 'project.destory'},

      { role_id: 1 , permission_slug: 'stack.index' },
      { role_id: 1 , permission_slug: 'stack.create' },
      { role_id: 1 , permission_slug: 'stack.update' },
      { role_id: 1 , permission_slug: 'stack.destory'}, 
      { role_id: 1 , permission_slug: 'skill.question.index' },
      { role_id: 1 , permission_slug: 'skill.question.create' },
      { role_id: 1 , permission_slug: 'skill.question.update' },
      { role_id: 1 , permission_slug: 'skill.question.destory'},
      
      { role_id: 1 , permission_slug: 'manager.index' },
      { role_id: 1 , permission_slug: 'role.index'},
    ]);
    await queryInterface.bulkInsert('managers', [
      { id: 1, name: 'Jax', phone: '17820727020', role_id: 1, }
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('permission_groups', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('managers', null, {});
  },
};
