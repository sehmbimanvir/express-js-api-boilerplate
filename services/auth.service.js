import jwt from 'jsonwebtoken'
import Settings from '../config'

export const generteAuthPayload = user => {
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
  }

  data.token = jwt.sign({
    sub: data.id
  }, Settings.jwt.secret, {
    expiresIn: Settings.jwt.expires_in,
    issuer: Settings.jwt.issuer
  })

  return data
}

export const authValidations = {
  login: {
    email: 'required|email',
    password: 'required|min:6'
  },
  register: {
    name: 'required',
    email: 'required|email',
    password: 'required|min:6|confirmed'
  },
  forgot: {
    email: 'required|email'
  },
  reset: {
    password: 'required|min:6|confirmed'
  }
}