require('./Products');
const mongoose = require('mongoose');
const Products = mongoose.model('products');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Products.find({})
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
	async indexByUser(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Products.find({ userid: id })
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
	async indexByCategory(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Products.find({ category: req.params.category })
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

		const { image, name, weight, price, category } = req.body;

		if (authorized) {
			const product = new Products({
				userid: id,
				image: image,
				name: name,
				weight: weight,
				price: price,
				category: category,
			});
			product
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

	async update(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);
		const update = req.body.update;
		if (authorized) {
			Products.findOneAndUpdate({ _id: req.params.id }, update)
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
			Products.findOneAndDelete({ _id: req.params.id })
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
