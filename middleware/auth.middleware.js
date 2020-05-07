import jwt from 'jsonwebtoken'
import Settings from '../config';
import Validator from 'validatorjs'
import ValidationException from '../exceptions/ValidationException'
import mongoose from 'mongoose'

Validator.registerAsync('unique', function (value, attributes, req, passes) {
  const parts = attributes.split(',')
  if (!mongoose.models[parts[0]]) {
    throw new Error(`${parts[0]} model not found.`)
  }
  const Schema = mongoose.model(parts[0])
  const column = parts[1]
  Schema.count({ [column]: value }, (err, count) => {
    if (count) {
      return passes(false, 'This email address has already been taken.');
    }
    passes()
  })
})

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
    let validation = new Validator(req.body, rules)
    try {
      validation.checkAsync(() => {
        next()
      }, () => {
        next(new ValidationException(validation.errors))
      })
    } catch (err) {
      next(err)
    }
  }
}