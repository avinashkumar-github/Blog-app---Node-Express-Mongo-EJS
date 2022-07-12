const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {type:String, required: true},
    subtitle: {type:String, required:true},
    content: {type:String, required: true},
    image:{type: String, default: "/assets/img/about-bg.jpg"},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    createdAt: {type:Date, default: new Date()}
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;