# jiker-neon

nodejs eggjs simple

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### sequelize-cli
[文档](https://sequelize.org/master/)

[中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/v5)

```
npx sequelize migration:generate --name=init-users

npx sequelize db:migrate

npx sequelize db:migrate:undo

npx sequelize db:migrate:undo:all

NODE_ENV=test npx sequelize db:migrate
```

```
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:undo

npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

npx sequelize-cli db:seed:undo:all
```

[egg]: https://eggjs.org