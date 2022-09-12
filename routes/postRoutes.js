const express = require("express");
const {
  getPost,
  uploadPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

router.get("/", wrapAsync(getPost));
router.post("/", wrapAsync(uploadPost));
router.put("/:postId", wrapAsync(updatePost));
router.delete("/:postId", wrapAsync(deletePost));

module.exports = router;
