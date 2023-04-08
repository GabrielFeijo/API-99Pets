require('./User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		if (authorized) {
			User.find({})
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async add(req, res) {
		const existente = await User.findOne({ email: req.body.email });

		if (!existente) {
			const salt = bcrypt.genSaltSync();
			senhaHash = bcrypt.hashSync(req.body.senha, salt);
			const user = new User({
				nome: req.body.nome,
				email: req.body.email,
				senha: senhaHash,
			});
			user
				.save()
				.then((data) => {
					console.log(data);
					res.status(201).send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(409).send('Usuário já cadastrado');
		}
	},
	async update(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		if (authorized) {
			const salt = bcrypt.genSaltSync();
			senhaHash = bcrypt.hashSync(req.body.senha, salt);
			User.findByIdAndUpdate(id, {
				nome: req.body.nome,
				email: req.body.email,
				senha: senhaHash,
			})
				.then((data) => {
					console.log(data);
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
	async deleteById(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			User.findByIdAndRemove(req.params.id)
				.then((data) => {
					console.log(data);
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado');
		}
	},
};
