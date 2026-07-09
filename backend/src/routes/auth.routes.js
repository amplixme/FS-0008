import express from "express";
import { register } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/register", validate(), register);

export default router;
