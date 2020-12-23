const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const generateToken = require('../../utils/generateToken')
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators')

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) => {
      const { valid, errors } = validateRegisterInput({
        username,
        password,
        confirmPassword,
        email,
      })
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      try {
        const user = await User.findOne({ username })
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken',
            },
          })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
          email,
          username,
          password: hashedPassword,
          createdAt: new Date().toISOString(),
        })
        const res = await newUser.save()
        const token = generateToken(res)

        return {
          ...res._doc,
          id: res._id,
          token,
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput({
        username,
        password,
      })
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      try {
        const user = await User.findOne({ username })
        if (!user) {
          errors.general = 'User not found'
          throw new UserInputError('User not found', { errors })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          errors.general = 'Wrong credentials'
          throw new UserInputError('Wrong credentials', { errors })
        }

        return {
          ...user._doc,
          id: user._id,
          token: generateToken(user),
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
