import { Router } from 'express'
import { authService } from '../services'

const router = Router()

router.post('/login', authService.login)

router.post('/refresh', authService.refresh)

export default router
