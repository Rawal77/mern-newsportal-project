const express = require("express");
const { Front } = require("../../controllers");

const router = express.Router();

router.get("/category", Front.List.categories);
router.get("/category/:id", Front.List.categoryById);
router.get("/category/:id/posts", Front.Post.byCategoryId);
// router.get("/journalist/:id/posts", Front.Post.byJournalistId);
// router.get("/journalist", Front.List.journalist);
// router.get("/journalist/:id", Front.List.journalistById);
router.get("/search", Front.Post.search);
module.exports = router;
