const cors = require('cors')
const express = require('express')
const app = express()
const {
  getUsers, getPostureEvents, getPostureEventsByUser, getEmotionEventsByUser,
} = require('./controllers/controllers')

app.use(cors())

app.use(express.json())

app.get('/users', getUsers)

app.get('/events/posture', getPostureEvents)

app.get('/events/posture/:user_id', getPostureEventsByUser)

app.get('/events/emotion/:user_id', getEmotionEventsByUser)

app.get('*', function(req, res){
  res.status(404).send({msg:'Not found'});
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({msg: err.msg})
  } else {
    next()
  }
})

app.use((err, req, res, next)=>{
  console.log("500 handler", err)
  res.status(500).send({msg: "Internal Server Error"})
})

module.exports = app