const { User, Thoughts } = require("../models");
const mongoose = require("mogoose");

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addtoSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? this.res.status(404).json({
              message: "No user with that ID",
            })
          : this.res.json("Success")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() => res.json({ message: "Thought deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  // reactions

  newReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: {
            reactionId: mongoose.Types.ObjectId(req.body.reactionId),
          },
        },
      },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
