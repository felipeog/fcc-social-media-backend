const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    recaptchaToken: String!
  }

  input LoginInput {
    username: String!
    password: String!
    recaptchaToken: String!
  }

  extend type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput!): User!
  }
`
