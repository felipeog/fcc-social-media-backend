if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')

const Models = require('./models')
const AuthMiddleware = require('./middlewares/auth')

const app = express()
app.use(AuthMiddleware)

const server = new ApolloServer({
  typeDefs: require('./graphql/typeDefs'),
  resolvers: require('./graphql/resolvers'),
  schemaDirectives: require('./graphql/schemaDirectives'),
  context: ({ req }) => {
    const { user, isAuth, authError } = req

    return {
      req,
      user,
      isAuth,
      authError,
      ...Models,
    }
  },
})

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.CORS_ORIGIN || true,
  },
})

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () =>
      consola.success({
        badge: true,
        message: `Server running @ http://localhost:${PORT}${server.graphqlPath}`,
      })
    )
  })
  .catch((err) => consola.error({ message: err.message, badge: true }))
