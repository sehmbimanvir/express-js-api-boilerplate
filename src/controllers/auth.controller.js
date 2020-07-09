import UserModel from '../models/user.model'
import bcrypt from 'bcryptjs'
import { generteAuthPayload } from '../services/auth.service'
import { sendPasswordResetLink } from '../events/sendPasswordResetLink'
import jwt from 'jsonwebtoken'
import Settings from '../config'

/**
 * Register New User
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body
  const user = new UserModel({ name, email, password })
  await user.save();
  res.sendJSON('User Registered Successfully')
}

/**
 * Authenticate User
 */
export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendJSON('Invalid Credentials', {}, 401)
  }
  return res.sendJSON('User Logged in Successfully', generteAuthPayload(user))
}

/**
 * Forgot Password
 */
export const forgot = async (req, res) => {
  const { email } = req.body

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.sendJSON('User not found', {}, 404)
  }

  await sendPasswordResetLink(user.toObject())
  return res.sendJSON('Password reset email sent successfully')
}

/**
 * Reset Password
 */
export const reset = async (req, res) => {
  const resetToken = req.params.token

  const user = await UserModel.findOne({ reset_token: resetToken })

  if (!user) {
    return res.sendJSON('Invalid reset token', {}, 400)
  }

  try {
    jwt.verify(resetToken, Settings.jwt.secret)
  } catch (err) {
    user.reset_token = undefined
    user.save()
    res.sendJSON('Reset token has been expired.', {}, 400)
  }

  /** Save Password */
  user.password = req.body.password
  user.reset_token = undefined
  await user.save()
  res.sendJSON('Password has been reset successfully')
}