import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: [
    "https://todo-list-6zxa.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Backend Working!");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);