const post = require('./post')
const user = require('./user')
const comment = require('./comment')

module.exports = {
  Post: {
    likeCount: ({ likes }) => likes.length,
    commentCount: ({ comments }) => comments.length,
  },
  Query: {
    ...post.Query,
  },
  Mutation: {
    ...user.Mutation,
    ...post.Mutation,
    ...comment.Mutation,
  },
}
