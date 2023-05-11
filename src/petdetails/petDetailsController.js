require('./PetDetails');
const mongoose = require('mongoose');
const PetDetails = mongoose.model('petdetails');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			PetDetails.find({})
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
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		let { petid, services } = req.body;

		if (authorized) {
			const pet = new PetDetails({
				petid: petid,
				services: services,
				states: [
					{
						name: 'Serviço solicitado',
						value: true,
						updated_at: new Date(new Date() - 3600 * 1000 * 3).toISOString(),
					},
					{ name: 'Pet chegou ao petshop', value: false, updated_at: null },
					{ name: 'Pet está sendo cuidado', value: false, updated_at: null },
					{
						name: 'Pet está pronto para ir para casa',
						value: false,
						updated_at: null,
					},
				],
			});
			pet
				.save()
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
	async indexOne(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			PetDetails.findOne({ petid: req.query.pet })
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
			PetDetails.findByIdAndUpdate({ _id: req.query.id }, update)
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
			PetDetails.findByIdAndRemove(req.query.id)
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
