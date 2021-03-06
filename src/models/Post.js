const { model, Schema } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
})

postSchema.plugin(mongoosePaginate)

module.exports = model('Post', postSchema)
