export const responseHelper = (req, res, next) => {
  res.sendJSON = (message, data = {}, status = 200) => {
    res.status(status).json({ message, data })
  }
  next()
}

export const clientErrors = (err, req, res, next) => {
  let message = err.message || 'Something Went Wrong...'
  let data = []
  let status = 400
  // console.log(err)
  if (err.name === 'InputValidationError') {
    message = err.message
    data = err.errors
    status = err.status
  } else if (err.name === 'MongoError' || err.name === 'MissingSchemaError' || err.name === 'ValidationError') {
    message = err.errmsg || err.message
  }
  
  res.status(status).json({ message, data })
  next()
}