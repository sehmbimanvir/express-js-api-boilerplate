import Mailer from '../services/mailer.service'
import Settings from '../config'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import { prepareEmailMessage } from '../utils'

const saveTokenIntoDatabase = async (userId) => {
  const resetToken = jwt.sign({}, Settings.jwt.secret, {
    expiresIn: '2h'
  })
  await UserModel.findByIdAndUpdate(userId, {
    reset_token: resetToken
  })
  return resetToken
}

export const sendPasswordResetLink = async ({ email, ...data }) => {
  const resetToken = await saveTokenIntoDatabase(data._id)
  data.reset_token = resetToken

  let message = prepareEmailMessage(email, 'Password Reset Link', 'forgotPassword', {
    data,
    site: Settings.site
  })

  return new Promise((resolve, reject) => {
    Mailer.sendMail(message, (err, response) => {
      if (err)
        return reject(err)

      resolve(response)
    })
  })
}