const { Schema, Types } = require("mongoose");
const reactionSchema = require("./reactions");

const thoughtSchema = new Schema(
  {
    thoughtMain: {
      type: String,
    },

    username: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
const thoughtsSchema = Types("thoughts", thoughtSchema);
module.exports = thoughtsSchema;
