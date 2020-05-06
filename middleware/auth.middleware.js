import jwt from 'jsonwebtoken'
import Settings from '../config';
import Validator from 'validatorjs'
import ValidationException from '../exceptions/ValidationException'

export const validateToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.jsonSuccess('No Token Provided', null, 401);
  }

  jwt.verify(token, Settings.jwt.secret, (err) => {
    if (err) {
      return res.jsonError(err)
    }
    next()
  })
}

export const validation = rules => {
  return (req, res, next) => {
    try {
      let validation = new Validator(req.body, rules)
      if (validation.fails()) {
        throw new ValidationException(validation.errors)
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}