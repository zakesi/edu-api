'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
