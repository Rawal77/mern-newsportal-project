const express = require("express");
const { Profile } = require("../../controllers");
const { VisitorOnly, auth } = require("../../lib");

const router = express.Router();

router.get("/detail", Profile.detail);
router.put("/edit-profile", Profile.profile);
router.put("/change-password", Profile.password);
router.get("/reviews", auth, VisitorOnly, Profile.review);
module.exports = router;
