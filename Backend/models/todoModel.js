import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true  // This links the todo to a specific user
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;