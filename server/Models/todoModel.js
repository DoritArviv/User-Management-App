const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
      userId: Number,
      id: Number,
      title: String,
      completed: Boolean,
    },
    {
      collection: "todos",
    }
  );

  module.exports = mongoose.model("Todo", TodoSchema);