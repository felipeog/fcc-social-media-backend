if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const consola = require('consola')

const Models = require('./models')

const server = new ApolloServer({
  typeDefs: require('./graphql/typeDefs'),
  resolvers: require('./graphql/resolvers'),
  context: ({ req }) => ({ req, ...Models }),
  cors: {
    origin: process.env.CORS_ORIGIN || true,
  },
})

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: process.env.PORT || 5000 }))
  .then(({ url }) =>
    consola.success({ message: `Server running @ ${url}`, badge: true })
  )
  .catch((err) => consola.error({ message: err.message, badge: true }))
