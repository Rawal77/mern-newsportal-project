const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router.route("/").get(Cms.categories.index).post(Cms.categories.store);

router
  .route("/:id")
  .get(Cms.categories.show)
  .put(Cms.categories.update)
  .patch(Cms.categories.update)
  .delete(Cms.categories.destroy);

module.exports = router;
