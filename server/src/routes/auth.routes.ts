import express from "express";
import { Request, Response } from "express";
import { createUserSchema } from "../schemas/auth/create-user.schema";
import { loginUserSchema } from "../schemas/auth/login-user.schema";
import { validation } from "../middlewares/validation";
import { registerUserHandler } from "../controllers/auth.controller";

const router = express.Router()


router.post('/register', validation(createUserSchema), registerUserHandler)

router.post('/login', validation(loginUserSchema), async (req: Request, res: Response) => {
    res.send('implement login')
})
router.post('/refresh')


export default router
