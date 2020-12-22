const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { validateRegisterInput } = require('../../utils/validators')

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
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
