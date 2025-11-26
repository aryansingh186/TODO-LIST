import express from "express";
import { register, login, logout, deleteUser, getProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.get("/logout", logout);
router.delete("/:id", deleteUser);

export default router;