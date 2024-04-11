const { Schema, model } = require("mongoose");

const User = model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
        maxLength: 15,
      },
      password: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        enum: ["Admin", "Journalist", "Visitor"],
        default: "Visitor",
      },
    },
    {
      autoCreate: true,
      autoIndex: true,
      timestamps: true,
    }
  )
);

module.exports = User;
