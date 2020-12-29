const jwt = require('jsonwebtoken')

module.exports = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.MONGODB_SECRET_KEY,
    { expiresIn: '1h' }
  )
