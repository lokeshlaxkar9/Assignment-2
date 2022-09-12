const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
