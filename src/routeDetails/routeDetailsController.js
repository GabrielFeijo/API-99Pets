require('./RouteDetails');
const mongoose = require('mongoose');
const RouteDetails = mongoose.model('RouteDetails');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			RouteDetails.find({})
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
		let { from, to, time_spent, kilometers_driven, route_price, finished } =
			req.body;

		if (authorized) {
			const route = new RouteDetails({
				from: from,
				to: to,
				time_spent: time_spent,
				kilometers_driven: kilometers_driven,
				route_price: route_price,
				finished: finished,
			});
			route
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
			RouteDetails.findOne({ _id: req.params.id })
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
			RouteDetails.findByIdAndUpdate({ _id: req.params.id }, update)
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
			RouteDetails.findByIdAndRemove(req.params.id)
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
