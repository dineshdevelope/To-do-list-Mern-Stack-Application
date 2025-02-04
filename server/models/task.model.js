import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
  },
  completed: {
    type: String,
  },
});

const Task = model("Task", schema);
export default Task;
