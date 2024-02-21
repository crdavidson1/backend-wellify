const express = require('express')
const app = express()
const {getTopics, getEndpoints, getArticleById, getArticles, getCommentsById} = require('./controllers/topics-controllers')

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.get('*', function(req, res){
  res.status(404).send({msg:'Not found'});
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({msg: err.msg})
  } else if (err.code === '22P02') {
    res.status(400).send({msg: 'Bad request'})
  } else {
    next()
  }
})

app.use((err, req, res, next)=>{
  console.log("500 handler", err)
  res.status(500).send({msg: "Internal Server Error"})
})
  
module.exports = app;