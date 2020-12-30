const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type PostPagination {
    posts: [Post]!
    totalCount: Int!
    hasNextPage: Boolean!
    nextPage: Int
  }
  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts(page: Int, limit: Int): PostPagination!
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): ID!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
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
`
