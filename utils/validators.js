const validator = require('validator')

const isValid = (errors) => Object.keys(errors).length === 0

module.exports.validateRegisterInput = ({
  username,
  password,
  confirmPassword,
  email,
}) => {
  const errors = {}

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

  return { errors, valid: isValid(errors) }
}

module.exports.validateLoginInput = ({ username, password }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(username))) {
    errors.username = 'Username must not be empty'
  }

  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    errors.password = 'Password must not be empty'
  }

  return { errors, valid: isValid(errors) }
}

module.exports.validatePostInput = ({ body }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(body))) {
    errors.body = 'Post body must not be empty'
  }

  return { errors, valid: isValid(errors) }
}

module.exports.validateCommentInput = ({ body }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(body))) {
    errors.body = 'Comment body must not be empty'
  }

  return { errors, valid: isValid(errors) }
}
