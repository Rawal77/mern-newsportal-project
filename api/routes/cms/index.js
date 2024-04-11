const express = require("express");
const journalistRoute = require("./journalist.route");
const categoriesRoute = require("./categories.route");
const visitorRoute = require("./visitors.route.js");
const postRoute = require("./posts.route.js");
const reviewRoute = require("./review.route.js");
const { adminOnly } = require("../../lib");
const router = express.Router();

router.use("/journalist", adminOnly, journalistRoute);
router.use("/categories", categoriesRoute);
router.use("/visitors", visitorRoute);
router.use("/posts", postRoute);
router.use("/reviews", reviewRoute);

module.exports = router;
