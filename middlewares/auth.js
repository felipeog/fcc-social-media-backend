const jwt = require('jsonwebtoken')

const { User } = require('../models')

module.exports = async (req, _, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.MONGODB_SECRET_KEY)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  const authUser = await User.findById(decodedToken.id)
  if (!authUser) {
    req.isAuth = false
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
