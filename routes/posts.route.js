const { response } = require("express");
const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts.controller");

// get all posts
router.get("/", postsController.findAll);

// add new post
router.post("/", postsController.validate("create"), postsController.create);

//get a specific posts
router.get("/:postId", postsController.findById);

//delete post
router.delete("/:postId", postsController.deleteById);

//update a specific post
router.patch("/:postId", postsController.updateById);

module.exports = router;
