const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);
module.exports = List;
