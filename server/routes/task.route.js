import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", authenticate, getTask);

router.post("/", authenticate, addTask);

router.put("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, deleteTask);

export default router;
