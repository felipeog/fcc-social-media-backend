const { UserInputError, AuthenticationError } = require('apollo-server')

const getUserFromReq = require('../../utils/getUserFromReq')
const { validateCommentInput } = require('../../utils/validators')

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, { req, Post }) => {
      const { username } = getUserFromReq(req)
      const { errors, valid } = validateCommentInput({ body })
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      try {
        const post = await Post.findById(postId)
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          })

          await post.save()
          return post
        } else {
          throw new UserInputError('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    deleteComment: async (_, { postId, commentId }, { req, Post }) => {
      const { username } = getUserFromReq(req)

      try {
        const post = await Post.findById(postId)
        if (post) {
          const commentIndex = post.comments.findIndex(
            (comment) => comment.id === commentId
          )

          if (commentIndex >= 0) {
            if (post.comments[commentIndex].username === username) {
              post.comments.splice(commentIndex, 1)
              await post.save()
              return post
            } else {
              throw new AuthenticationError('Action not allowed')
            }
          } else {
            throw new UserInputError('Comment not found')
          }
        } else {
          throw new UserInputError('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
