'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('permission_groups', []);
    await queryInterface.bulkInsert('permissions', []);
    await queryInterface.bulkInsert('roles', []);
    await queryInterface.bulkInsert('role_permissions', []);
    await queryInterface.bulkInsert('managers', []);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('permission_groups', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('managers', null, {});
  },
};
