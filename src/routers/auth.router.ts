import { Router } from 'express'
import { authService } from '../services'

const router = Router()

router.get('/login', authService.login)

router.get('/refresh', authService.refresh)

export default router
