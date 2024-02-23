const express = require('express')
const app = express()
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsById,
  postComment,
  patchArticle,
  deleteComment,
  getUsers
} = require('./controllers/controllers')

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)
app.patch('/api/articles/:article_id', patchArticle)

app.get('/api/articles/:article_id/comments', getCommentsById)
app.post('/api/articles/:article_id/comments', postComment)

app.delete('/api/comments/:comment_id', deleteComment)

app.get('*', function(req, res){
  res.status(404).send({msg:'Not found'});
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({msg: err.msg})
  } else if (err.code === '22P02' || err.code === '23502') {
    res.status(400).send({msg: 'Bad request'})
  } else if (err.code === '23503') {
    res.status(404).send({msg: 'article does not exist'})
  } else {
    next()
  }
})

app.use((err, req, res, next)=>{
  console.log("500 handler", err)
  res.status(500).send({msg: "Internal Server Error"})
})
  
module.exports = app;