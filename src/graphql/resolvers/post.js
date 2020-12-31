const { AuthenticationError, UserInputError } = require('apollo-server-express')

const { validatePostInput } = require('../../utils/validators')

module.exports = {
  Query: {
    getPosts: async (_, { page, limit }, { Post }) => {
      try {
        const options = {
          page: page || 1,
          limit: limit || 8,
          sort: { createdAt: -1 },
        }
        const data = await Post.paginate({}, options)
        const result = {
          posts: data.docs,
          totalCount: data.totalDocs,
          hasNextPage: data.hasNextPage,
          nextPage: data.nextPage,
        }

        return result
      } catch (err) {
        throw new Error(err)
      }
    },
    getPost: async (_, { postId }, { Post }) => {
      try {
        const post = await Post.findById(postId)

        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, { user, Post }) => {
      const { errors, valid } = validatePostInput({ body })
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      try {
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        })
        const post = await newPost.save()

        return post
      } catch (err) {
        throw new Error(err)
      }
    },
    deletePost: async (_, { postId }, { user, Post }) => {
      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.delete()
          return postId
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    likePost: async (_, { postId }, { user, Post }) => {
      try {
        const post = await Post.findById(postId)
        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            )
          } else {
            post.likes.push({
              username: user.username,
              createdAt: new Date().toISOString(),
            })
          }

          await post.save()
          return post
        } else {
          throw new UserInputError('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
