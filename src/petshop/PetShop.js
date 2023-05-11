const mongoose = require('mongoose');

const PetShopSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	CNPJ: String,
	pictureUrl: String,
	bank: {},
	services:{},
});

mongoose.model('petshop', PetShopSchema);
