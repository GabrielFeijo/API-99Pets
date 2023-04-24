const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	CPF: String,
	vehicle: {},
	bank: {},
});

mongoose.model('driver', DriverSchema);
