const mongoose = require('mongoose');

const EmpoyeeSchema = new mongoose.Schema({
	userid: String,
	nome: String,
	idade: String,
	raca: String,
	picture: String,
});

mongoose.model('pets', EmpoyeeSchema);
