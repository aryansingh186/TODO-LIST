import Todo from "../models/todoModel.js";
import jwt from "jsonwebtoken";

// Helper function to get user ID from token
const getUserIdFromToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    
    // Only fetch todos that belong to this user
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Get Todos Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { text, completed } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const newTodo = new Todo({
      text,
      completed: completed || false,
      userId  // Link this todo to the current user
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error("Create Todo Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;
    const { text, completed } = req.body;

    // Find the todo and verify it belongs to this user
    const todo = await Todo.findOne({ _id: id, userId });
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    // Update fields
    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.error("Update Todo Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    // Find and delete only if it belongs to this user
    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};