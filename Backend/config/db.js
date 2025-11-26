import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoApp");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
};

export default connectDB;
