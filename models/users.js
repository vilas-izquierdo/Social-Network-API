const { Schema, Types } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    thoughts: {
      type: Schema.ObjectId,
      ref: "thoughts",
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtuals("friendCount").get(function friendCount() {
  return this.friends.length;
});

const User = model("user", userSchema);
module.exports = User;
