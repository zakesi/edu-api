'use strict';
require("dotenv").config();
exports.sequelize = {
	dialect: process.env.DB_CONNECTION,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE + '-test',
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
};
