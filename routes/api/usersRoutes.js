const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  newFriend,
  deleteFriend,
} = require("../../controllers/user.js");
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

router.route("/:userId/friend/:friendId").post(newFriend).delete(deleteFriend);

module.exports = router;
