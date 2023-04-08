const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	nome: String,
	email: String,
	senha: String,
	codigoRecuperacao: String,
	dataCodigo: Date,
	token: String,
});

mongoose.model('user', UserSchema);
