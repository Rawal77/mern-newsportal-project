const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router.route("/").get(Cms.visitors.index).post(Cms.visitors.store);

router
  .route("/:id")
  .get(Cms.visitors.show)
  .put(Cms.visitors.update)
  .patch(Cms.visitors.update)
  .delete(Cms.visitors.destroy);

module.exports = router;
