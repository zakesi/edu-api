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
  factory.define('course', app.model.Course, {
    name: factory.sequence('Course.name', n => `name_${n}`),
    short_name: factory.sequence('Course.short_name', n => `short_name_${n}`),
    description: factory.chance('sentence', { word: 10 }),
    tips: factory.chance('sentence', { word: 5 }),
    image_url: '',
    status: 0,
  });
};
