const express = require("express");
const { Cms } = require("../../controllers");
const { fileUpload } = require("../../lib");

const router = express.Router();

router
  .route("/")
  .get(Cms.posts.index)
  .post(
    fileUpload(["image/jpeg", "image/jpg", "image/png", "image/gif"]).array(
      "images"
    ),
    Cms.posts.store
  );

router
  .route("/:id")
  .get(Cms.posts.show)
  .put(
    fileUpload(["image/jpg", "image/jpeg", "image/png", "image/gif"]).array(
      "images"
    ),
    Cms.posts.update
  )
  .patch(
    fileUpload(["image/jpg", "image/jpeg", "image/png", "image/gif"]).array(
      "images"
    ),
    Cms.posts.update
  )
  .delete(Cms.posts.destroy);

router.delete("/:id/image/:filename", Cms.posts.images);

module.exports = router;
