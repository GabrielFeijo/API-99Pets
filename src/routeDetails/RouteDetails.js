const mongoose = require('mongoose');

const RouteDetailsSchema = new mongoose.Schema({
	userid: String,
	from: String,
	to: String,
	time_spent: Number,
	kilometers_driven: Number,
	route_price: Number,
	created_at: Date,
});

mongoose.model('routeDetails', RouteDetailsSchema);
