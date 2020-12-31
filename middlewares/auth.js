const jwt = require('jsonwebtoken')

const { User } = require('../models')

module.exports = async (req, _, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    req.authError = 'Authorization header must be provided'
    return next()
  }

  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    req.authError = 'Authentication token must be "Bearer [token]"'
    return next()
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.MONGODB_SECRET_KEY)
  } catch (err) {
    req.isAuth = false
    req.authError = 'Invalid or expired token'
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    req.authError = 'Invalid or expired token'
    return next()
  }

  const authUser = await User.findById(decodedToken.id)
  if (!authUser) {
    req.isAuth = false
    req.authError = 'Invalid or expired token'
    return next()
  }

  req.isAuth = true
  req.user = {
    id: authUser._id,
    email: authUser.email,
    username: authUser.username,
    createdAt: authUser.createdAt,
  }
  return next()
}
