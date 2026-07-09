import express from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", validate(), authController.register);
router.post("/login", validate(), authController.login);

export default router;
