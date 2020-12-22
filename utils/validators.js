const validator = require('validator')

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

  const valid = Object.keys(errors).length === 0

  return { errors, valid }
}

module.exports.validateLoginInput = ({ username, password }) => {
  const errors = {}

  if (validator.isEmpty(validator.trim(username))) {
    errors.username = 'Username must not be empty'
  }

  if (validator.isEmpty(password, { ignore_whitespace: true })) {
    errors.password = 'Password must not be empty'
  }

  const valid = Object.keys(errors).length === 0

  return { errors, valid }
}
