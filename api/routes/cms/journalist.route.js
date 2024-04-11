const express = require("express");
const { Cms } = require("../../controllers");

const router = express.Router();

router.route("/").get(Cms.journalist.index).post(Cms.journalist.store);

router
  .route("/:id")
  .get(Cms.journalist.show)
  .put(Cms.journalist.update)
  .patch(Cms.journalist.update)
  .delete(Cms.journalist.destroy);

module.exports = router;
