import Settings from './config'

export const generateRandomString = (length = 10) => {
  const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const wordsLength = string.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += string[getRandomNumber(0, wordsLength)]
  }

  return result
}

export const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min) - 1;
}

export const asyncTryCatchMiddleware = handler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e)
    }
  };
}

export const prepareEmailMessage = (to, subject, template, context) => {
  return {
    from: Settings.mail.from,
    to,
    subject,
    template,
    context
  }
}