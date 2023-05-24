const TeachableMachine = require('@sashido/teachablemachine-node');

const model = new TeachableMachine({
	modelUrl: 'https://teachablemachine.withgoogle.com/models/_RMNdhOyi/',
});

module.exports = {
	async checkImage(req, res) {
		model
			.classify({
				imageUrl: req.body.image,
			})
			.then((predictions) => {
				console.log('Predictions:', predictions);
				res.status(200).send(predictions);
			})
			.catch((e) => {
				console.log('ERROR', e);
				res.status(500).send('Something went wrong!');
			});
	},
};
