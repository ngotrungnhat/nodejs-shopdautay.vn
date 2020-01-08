import { Router } from 'express'
import userRouter from './user_router'

const router = Router()

router.use('/user', userRouter)

export default router
