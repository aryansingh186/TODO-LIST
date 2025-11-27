import express from "express";
import { protect } from "../middleware/authMiddleware.js"; 

import { 
  createTodo, 
  getTodos,
  updateTodo, 
  deleteTodo 
} from "../controllers/todoController.js";

const router = express.Router();

// Add protect middleware to ALL routes
router.get("/", protect, getTodos);           
router.post("/", protect, createTodo);        
router.put("/:id", protect, updateTodo);      
router.delete("/:id", protect, deleteTodo);   

export default router;