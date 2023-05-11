const mongoose = require('mongoose');

const PetDetailsSchema = new mongoose.Schema({
	id: String,
	petid: String,
	services: [],
	states: {},
});

mongoose.model('petdetails', PetDetailsSchema);
