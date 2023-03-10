import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
