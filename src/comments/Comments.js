const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userid: String,
    name: String,
    rating: Number,
    comment: String,
});

mongoose.model("comments", CommentsSchema);
