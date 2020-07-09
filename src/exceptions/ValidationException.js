class ValidationException extends Error {
  constructor (errors, message = 'Validation Failed', status = 422) {
    super()
    this.name = 'InputValidationError'
    this.errors = errors
    this.message = message
    this.status = status
  }

  getErrors () {
    return this.errors
  }
}

export default ValidationException