const Post = require("../modals/Post");
const { findByIdAndUpdate } = require("../modals/User");
const User = require("../modals/User");
const AppError = require("../utils/AppError");

module.exports.getPost = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).send({ posts: posts });
};

module.exports.uploadPost = async (req, res, next) => {
  const { id, name } = res.locals.user;
  const { title, body, image } = req.body;
  const post = await Post.create({ title, body, image, user: id });
  res.status(200).send({ status: "Success", post });
};

module.exports.updatePost = async (req, res, next) => {
  const { id } = res.locals.user;
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (post) {
    if (post.user.equals(id)) {
      updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
        runValidators: true,
        new: true,
      });
      res.status(200).send({ status: "Success" });
    } else {
      throw new AppError("cannot update another person's posts", 401);
    }
  } else {
    throw new AppError("Invalid Post Id", 401);
  }
};

module.exports.deletePost = async (req, res, next) => {
  const { id } = res.locals.user;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (post) {
    if (post.user.equals(id)) {
      deletedPost = await Post.findByIdAndDelete(postId);
      res.status(200).send({ status: "Successfully Deleted" });
    } else {
      throw new AppError("cannot delete another person's posts", 401);
    }
  } else {
    throw new AppError("Invalid Post Id", 401);
  }
};
