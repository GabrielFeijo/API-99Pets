const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nome:String,
    email:String,
    senha:String
})


mongoose.model("user",UserSchema)