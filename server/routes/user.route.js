import express from "express";
import {
  loginController,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginController);

router;

export default router;
