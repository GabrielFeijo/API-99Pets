const mongoose = require('mongoose');

const PetDetailsSchema = new mongoose.Schema({
	petid: String,
	services: [],
	states: [],
});

mongoose.model('petdetails', PetDetailsSchema);
