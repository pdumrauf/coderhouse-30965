const express = require('express')
const { normalize, denormalize, schema } = require('normalizr')
const print = require('./utils/print')

const blog = require('./blog.json')

const app = express()

const userSchema = new schema.Entity('users')

const commentSchema = new schema.Entity('comments', {
  commenter: userSchema
})

const postSchema = new schema.Entity('posts', {
  author: userSchema,
  comments: [ commentSchema ]
})

const blogSchema = new schema.Entity('blog', {
  posts: [ postSchema ]
})

/* console.log('===== OBJETO ORIGINAL =====')
console.log(JSON.stringify(blog).length)
print(blog)

console.log('===== OBJETO NORMALIZADO =====')
const normalizedBlog = normalize(blog, blogSchema)
console.log(JSON.stringify(normalizedBlog).length)
print(normalizedBlog)

console.log('===== OBJETO DESNORMALIZADO =====')
const denormalizedBlog = denormalize(normalizedBlog.result, blogSchema, normalizedBlog.entities)
console.log(JSON.stringify(denormalizedBlog).length)
print(denormalizedBlog) */

const PORT = 8080

app.use(express.static('./public'))

app.get('/blog', (req, res) => {
  const normalizedBlog = normalize(blog, blogSchema)
  return res.json(normalizedBlog)
})

app.get('/blog-raw', (req, res) => {
  return res.json(blog)
})

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))



