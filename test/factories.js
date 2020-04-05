'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  app.factory = factory;
  factory.define('user', app.model.User, {
    name: factory.sequence('User.name', n => `name_${n}`),
    visit_at: new Date(),
  });
  factory.define('sms_log', app.model.SmsLog, {
    status: 0,
    template: 'SMS_173660228',
    code: factory.sequence('Smslog.code', n => `${n}1234`),
  });
};
