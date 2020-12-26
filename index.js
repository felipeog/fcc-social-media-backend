if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const server = new ApolloServer({
  typeDefs: require('./graphql/typeDefs'),
  resolvers: require('./graphql/resolvers'),
  context: ({ req }) => ({ req }),
})

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: process.env.PORT || 5000 }))
  .then(({ url }) => console.log('Server running @', url))
  .catch((err) => console.log(err))
