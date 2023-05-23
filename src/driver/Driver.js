const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	CPF: String,
	pictureUrl: String,
	wallet_value: String,
	vehicle: {},
	bank: {},
	routes: [],
});

mongoose.model('driver', DriverSchema);
