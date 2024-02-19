const express = require('express')
const app = express()
const {getTopics, getEndpoints} = require('./controllers/topics-controllers')

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('*', function(req, res){
  res.status(404).send({msg:'Not found'});
});

app.use((error, request, response, next) => {
  if (error.status && error.msg) {
      response.status(error.status).send({msg: error.msg})
  } else {
      next()
  }
})
  
module.exports = app;