const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
	userid: String,
	image: String,
	name: String,
	weight: Number,
	price: Number,
	category: String,
	description: String,
});

mongoose.model('products', ProductsSchema);
