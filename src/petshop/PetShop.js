const mongoose = require('mongoose');

const PetShopSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	CNPJ: String,
	description: String,
	pictureUrl: String,
	wallet_value: Number,
	rating: Number,
	bank: {},
	services: [],
	animalsInCare: [],
	serviceHistory: [],
});

mongoose.model('petshop', PetShopSchema);
