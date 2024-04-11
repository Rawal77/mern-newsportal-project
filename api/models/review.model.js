const { Schema, model } = require("mongoose");

const Review = model(
  "Review",
  new Schema(
    {
      post_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts",
      },
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      comment: {
        type: String,
        required: true,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = Review;
