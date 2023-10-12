import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    id: {
      type: String || Number,
    },
    title: {
      type: String,
      required: true,
    },
    completed: Boolean,
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
