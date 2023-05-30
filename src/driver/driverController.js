require('./Driver');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
const user = require('../user/userController');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Driver.find({})
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
		const { nome, CPF, email, senha, roles } = req.body;

		const newUser = { nome: nome, email: email, senha: senha, roles: roles };

		try {
			const userData = await user.newUser(newUser);
			const data = userData.result;
			const driver = new Driver({
				userid: data['_id'],
				nome: nome,
				CPF: CPF,
				pictureUrl: null,
				wallet_value: 0,
				rating: 5,
				vehicle: {},
				bank: {},
				routes: [],
			});
			driver
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
			Driver.findOne({ userid: req.params.id })
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
			Driver.findOneAndUpdate({ userid: id }, update)
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
			Driver.findOneAndDelete({ userid: id })
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
