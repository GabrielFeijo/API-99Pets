require('dotenv').config();

module.exports = {
	database: process.env.DB_NAME || 'mongodb://localhost/99Pets',
	port: process.env.APP_PORT || 3000,
};
