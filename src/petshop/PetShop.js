const mongoose = require('mongoose');

const PetShopSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	CNPJ: String,
	pictureUrl: String,
	bank: {},
});

mongoose.model('petshop', PetShopSchema);
