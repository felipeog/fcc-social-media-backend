const validator = require('validator')
const fetch = require('node-fetch')
const { ApolloError } = require('apollo-server-express')

const hasErrors = (errors) => Object.keys(errors).length === 0

const isRecaptchaValid = async (recaptchaToken) => {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
    )
    const data = await response.json()

    return data.success
  } catch (err) {
    throw new ApolloError('reCaptcha verification error')
  }
}

module.exports.validateRegisterInput = async ({
  username,
  password,
  confirmPassword,
  email,
  recaptchaToken,
}) => {
  const errors = {}

  const isHuman = await isRecaptchaValid(recaptchaToken)
  if (!isHuman) {
    errors.recaptchaToken = 'reCAPTCHA must pass'
  }

  if (validator.isEmpty(validator.trim(username))) {
    errors.username = 'Username must not be empty'
  }

  if (validator.isEmpty(validator.trim(email))) {
    errors.email = 'Email must not be empty'
  } else if (!validator.isEmail(email)) {
    errors.email = 'Invalid email'
  }

  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    errors.password = 'Password must not be empty'
  } else if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords must match'
  }

  return { errors, valid: hasErrors(errors) }
}

module.exports.validateLoginInput = async ({
  username,
  password,
  recaptchaToken,
}) => {
  const errors = {}

  const isHuman = await isRecaptchaValid(recaptchaToken)
  if (!isHuman) {
    errors.recaptchaToken = 'reCAPTCHA must pass'
  }

  if (validator.isEmpty(validator.trim(username))) {
    errors.username = 'Username must not be empty'
  }

  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    errors.password = 'Password must not be empty'
  }

  return { errors, valid: hasErrors(errors) }
}

module.exports.validatePostInput = ({ body }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(body))) {
    errors.body = 'Post body must not be empty'
  }

  return { errors, valid: hasErrors(errors) }
}

module.exports.validateCommentInput = ({ body }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(body))) {
    errors.body = 'Comment body must not be empty'
  }

  return { errors, valid: hasErrors(errors) }
}
