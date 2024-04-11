const express = require("express");
const { Cms } = require("../../controllers");
const router = express.Router();

router.route("/").get(Cms.review.index);
router.route("/:id").delete(Cms.review.destroy);

module.exports = router;
