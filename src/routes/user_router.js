import { Router } from 'express'
import UserController from '../controllers/user_controller'
const router = Router()
const userController = new UserController()

router.post('/sign-up', userController.createNormallUser)
router.post('/active-code', userController.activeNormalUser)
export default router
