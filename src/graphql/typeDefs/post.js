const { gql } = require('apollo-server-express')

module.exports = gql`
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

  extend type Query {
    getPosts(page: Int, limit: Int): PostPagination!
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(body: String!): Post! @isAuth
    deletePost(postId: ID!): ID! @isAuth
    createComment(postId: ID!, body: String!): Post! @isAuth
    deleteComment(postId: ID!, commentId: ID!): Post! @isAuth
    likePost(postId: ID!): Post! @isAuth
  }
`
