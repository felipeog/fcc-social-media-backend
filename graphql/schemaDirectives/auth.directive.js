const { defaultFieldResolver } = require('graphql')
const { ApolloError, SchemaDirectiveVisitor } = require('apollo-server-express')

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      const { isAuth, authError } = args[2]

      if (isAuth) {
        const result = await resolve.apply(this, args)
        return result
      } else {
        throw new ApolloError(authError)
      }
    }
  }
}

module.exports = IsAuthDirective
