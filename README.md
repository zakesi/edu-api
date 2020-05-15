# Jiker EDU API

Node.js eggjs

## QuickStart

see [egg docs][egg] for more detail.

see [wechat-jssdk][wechat-jssdk] for more detail.

### touch config/config.local.js

```
'use strict';

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'neon-edu',
  username: 'root',
  password: '123456',
  timezone: '+08:00',
};

exports.qiniu = {
  accessKey: 'xxx',
  secretKey: 'xxx',
  bucket: 'xxx',
  domain: 'xxx.jiker.com',
};

exports.wechat = {
  web: {
    redirectUrl: 'http://xxx.com',
    appid: 'xxx',
    secret: 'xxx',
  },
  miniprogram: {
    appid: 'xxx',
    secret: 'xxx',
  }
}
```

### migration && seed

```bash
npx sequelize db:migrate
npx sequelize-cli db:seed:all

# undo
npx sequelize db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```

### Development

```bash
$ yarn dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ NODE_ENV=vip npx sequelize db:migrate
$ yarn
$ yarn run stop
$ yarn run start:local
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### sequelize-cli
[文档](https://sequelize.org/master/)

[API](https://sequelize.org/master/identifiers.html)

[中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/v5)

```
npx sequelize migration:generate --name=init-users

npx sequelize db:migrate

npx sequelize db:migrate:undo

npx sequelize db:migrate:undo:all

NODE_ENV=test npx sequelize db:migrate
NODE_ENV=vip npx sequelize db:migrate
```

```
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:undo

npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

npx sequelize-cli db:seed:undo:all
```

[egg]: https://eggjs.org
[wechat-jssdk]: https://github.com/JasonBoy/wechat-jssdk
