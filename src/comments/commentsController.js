require('./Comments');
const mongoose = require('mongoose');
const Comments = mongoose.model('comments');
const auth = require('../auth/authController');

module.exports = {
	async indexAll(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Comments.find({})
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
			Comments.find({ userid: id })
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
		const { userid, name, rating, comment } = req.body;

		if (authorized) {
			const comments = new Comments({
				userid: userid,
				name: name,
				rating: rating,
				comment: comment,
			});
			comments
				.save()
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

	async indexOne(req, res) {
		let { id, token } = req.headers;

		const authorized = await auth.checkAccess(id, token);

		if (authorized) {
			Comments.findOne({ _id: req.params.id })
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
			Comments.findByIdAndUpdate({ _id: req.params.id }, update)
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
			Comments.findByIdAndRemove(req.params.id)
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
