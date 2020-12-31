const { defaultFieldResolver } = require('graphql')
const {
  AuthenticationError,
  SchemaDirectiveVisitor,
} = require('apollo-server-express')

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      const { isAuth } = args[2]

      if (isAuth) {
        const result = await resolve.apply(this, args)
        return result
      } else {
        throw new AuthenticationError('Not authenticaded')
      }
    }
  }
}

module.exports = IsAuthDirective
