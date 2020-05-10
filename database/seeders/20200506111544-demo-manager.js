'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('permission_groups', [
      { id: 1, name: '职业课程'},
      { id: 2, name: '项目管理'},
      { id: 3, name: '测评管理'},
      { id: 4, name: '权限管理'}
    ]);
    await queryInterface.bulkInsert('permissions', [
      { id: 1, name: '路径管理', slug: 'zhiye.index', group_id: 1 }, 
      { id: 2, name: '课程管理', slug: 'course.index', group_id: 1 },
      { id: 3, name: '企业管理', slug: 'company.index', group_id: 2 },
      { id: 4, name: '项目管理', slug: 'project.index', group_id: 2 },
      { id: 5, name: '技能管理', slug: 'stack.index', group_id: 3 },
      { id: 6, name: '题目管理', slug: 'skill.index', group_id: 3 },
      { id: 7, name: '管理员管理', slug: 'manager.index', group_id: 4 },
    ]);
    await queryInterface.bulkInsert('roles', [
      { id: 1, name: '管理员', description: '拥有所有权限',}
    ]);
    await queryInterface.bulkInsert('role_permissions', [
      { role_id: 1 , permission_slug: 'zhiye.index' }, 
      { role_id: 1 , permission_slug: 'course.index' },
      { role_id: 1 , permission_slug: 'company.index' },
      { role_id: 1 , permission_slug: 'project.index' },
      { role_id: 1 , permission_slug: 'stack.index' },
      { role_id: 1 , permission_slug: 'skill.index' },
      { role_id: 1 , permission_slug: 'manager.index' },
    ]);
    await queryInterface.bulkInsert('managers', [
      { id: 1, name: 'Jax', phone: '13511111111', role_id: 1, }
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('permission_groups', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('managers', null, {});
  },
};
