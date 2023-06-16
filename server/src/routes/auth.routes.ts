import express from "express";
import { createUserSchema } from "../schemas/auth/create-user.schema";
import { loginUserSchema } from "../schemas/auth/login-user.schema";
import { validation } from "../middlewares/validation";
import { loginUserHandler, registerUserHandler } from "../controllers/auth.controller";

const router = express.Router()


router.post('/register', validation(createUserSchema), registerUserHandler)

router.post('/login', validation(loginUserSchema), loginUserHandler)

export default router
