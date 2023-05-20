require('dotenv').config();

module.exports = {
	database: process.env.DB_NAME || 'mongodb://127.0.0.1:27017/99Pets',
	port: process.env.APP_PORT || 3000,
};
