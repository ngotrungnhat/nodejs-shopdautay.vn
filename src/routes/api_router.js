import { Router } from 'express'
import userRouter from './user_router'
import * as authController from "../controllers/auth_controller" //==import { authenticateNormalUser, authenticateFBUser, authenticateGGUser } from "../controllers/auth_controller"


const router = Router()

router.post("/authenticate", authController.authenticateNormalUser)
router.post("/fb-authenticate", authController.authenticateFBUser)
router.post("/gg-authenticate", authController.authenticateGGUser)

router.use('/user', userRouter)

export default router
