require('./PetShop');
const mongoose = require('mongoose');
const PetShop = mongoose.model('petshop');
const auth = require('../auth/authController');
const userController = require('../user/userController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			PetShop.find({})
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado.');
		}
	},
	async add(req, res) {
		const { nome, CNPJ, email, senha, roles } = req.body;

		const newUser = { nome: nome, email: email, senha: senha, roles: roles };

		try {
			const userData = await userController.newUser(newUser);
			const data = userData.result;
			const pet = new PetShop({
				userid: data['_id'],
				nome: nome,
				CNPJ: CNPJ,
				pictureUrl: null,
				bank: {},
			});
			pet
				.save()
				.then((data) => {
					console.log(data);
					res.status(userData.statusCode).send(userData.result);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			res.status(err.statusCode).send(err.result);
		}
	},

	async indexOne(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			PetShop.findOne({ userid: req.query.id })
				.then((data) => {
					console.log(data);
					res.send(data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.status(401).send('Não autorizado!');
		}
	},
	async update(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		const update = req.body.update;
		if (authorized) {
			PetShop.findOneAndUpdate({ userid: id }, update)
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
			PetShop.findOneAndDelete({ userid: id })
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
