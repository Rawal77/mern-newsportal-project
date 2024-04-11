const express = require("express");
const postRoute = require("./post.route");
const listRoute = require("./list.route");
const router = express.Router();

router.use("/post", postRoute);
router.use(listRoute);

module.exports = router;
