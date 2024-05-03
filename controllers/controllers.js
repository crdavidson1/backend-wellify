const {
    selectUsers,
    selectEvents,
    selectEventsByUser
} = require('../models/models.js')

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getEvents = (req, res, next) => {
    selectEvents().then((events) => {
        res.status(200).send({ events })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getEventsByUser = (req, res, next) => {
    const { user_id } = req.params
    selectEventsByUser(user_id).then((events) => {
        res.status(200).send({ events })
    })
    .catch((err) => {
        next(err)
    })
}