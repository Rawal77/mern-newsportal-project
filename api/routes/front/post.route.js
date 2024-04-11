const express = require("express");
const { Front, Profile } = require("../../controllers");
const { VisitorOnly, auth } = require("../../lib");
const router = express.Router();

router.get("/latest", Front.Post.latest);
router.get("/featured", Front.Post.featured);
router.get("/:id", Front.Post.byId);
router.get("/:id/similar", Front.Post.similar);
router.post("/:id/review", auth, VisitorOnly, Profile.addReview);
module.exports = router;
