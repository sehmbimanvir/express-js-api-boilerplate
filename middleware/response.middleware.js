export const responseHelper = (req, res, next) => {
  res.sendJSON = (message, data = {}, status = 200) => {
    res.status(status).json({ message, data })
  }
  next()
}

export const clientErrors = (err, req, res, next) => {
  let message = 'Something Went Wrong...'
  let data = []
  let status = 400

  if (err.name === 'InputValidationError') {
    message = err.message
    data = err.errors
    status = err.status
  } else if (err.name === 'MongoError') {
    message = err.errmsg
  } else if (err.name === 'ValidationError') {
    message = err.message
  }
  
  res.status(status).json({ message, data })
  next()
}