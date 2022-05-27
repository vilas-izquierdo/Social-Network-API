const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  newReaction,
  removeReaction,
} = require("../../controllers/thoughts.js");
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reactions").post(newReaction).delete(removeReaction);

module.exports = router;
