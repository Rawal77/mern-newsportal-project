const { model, Schema } = require("mongoose");

const Post = model(
  "Post",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
      category_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "categories",
      },
      status: {
        type: Boolean,
        default: true,
      },
      featured: {
        type: Boolean,
        default: false,
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = Post;
