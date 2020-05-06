import express from 'express'
import {
  login,
  register,
  forgot,
  reset
} from '../controllers/auth.controller'
import { validation } from '../middleware/auth.middleware'
import { asyncTryCatchMiddleware } from '../utils'
import { authValidations } from '../services/auth.service'

const router = express.Router()

router.post('/register', validation(authValidations.register), asyncTryCatchMiddleware(register))
router.post('/login', validation(authValidations.login), asyncTryCatchMiddleware(login))
router.post('/forgot', validation(authValidations.forgot), asyncTryCatchMiddleware(forgot))
router.post('/reset/:token', validation(authValidations.reset), asyncTryCatchMiddleware(reset))

export default router