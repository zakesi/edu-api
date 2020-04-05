'use strict';

const Service = require('egg').Service;

const JWT = require('jsonwebtoken');

class jwtService extends Service {
  async sign(id) {
    return JWT.sign({
      user_id: id,
    }, this.app.config.jwt.secret, {
      expiresIn: '7d',
    });
  }
}

module.exports = jwtService;
