const express = require("express");
const AuthRoute = require("./auth/auth.routes");
const CmsRoute = require("./cms");
const FrontRoute = require("./front");
const ProfileRoute = require("./profile/profile.route");
const { auth, cmsUser } = require("../lib");
const router = express.Router();

router.use("/auth", AuthRoute);
router.use("/cms", auth, cmsUser, CmsRoute);
router.use(FrontRoute);
router.use("/profile", auth, ProfileRoute);

router.get("/image/:filename", (req, res, next) => {
  res.sendFile(`uploads/${req.params.filename}`, {
    root: "./",
  });
});

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Resource not found",
  });
});

module.exports = router;
