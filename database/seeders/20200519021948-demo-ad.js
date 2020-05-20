'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('advertises', [
      { 
        id: 1,
        name: "首页banner",
        slug: "index_banner",
        width: 1280,
        height: 640,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id: 2,
        name: "首页腰图",
        slug: "index_waist",
        width: 1280,
        height: 640,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('materials', [
      { 
        id: 1,
        name: "社区飞书",
        upload_file: "https://vip-assets.jiker.com/_for_ad_sub_project/2020/0512/admin/BkBjCDCCU4VBkAVsCUXTEY1pFnJxtzh1lf8y2ScV.png",
        target: "_self",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id: 2,
        name: "TDD实战营",
        upload_file: "https://vip-assets.jiker.com/_for_ad_sub_project/2020/0515/admin/xsxpnyoN2FwHn6VuA59qBooX9KiCVBXAXIHL4BT4.png",
        target: "_self",
        jump_url: "https://www.jiker.vip/plus/2",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('advertise_materials', [
      { 
        id: 1,
        advertise_id: 1,
        material_id: 2,
        sort: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id: 2,
        advertise_id: 1,
        material_id: 1,
        sort: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        id: 3,
        advertise_id: 2,
        material_id: 1,
        sort: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('advertises', null, {});
    await queryInterface.bulkDelete('materials', null, {});
    await queryInterface.bulkDelete('advertise_materials', null, {});
  }
};
