const {
    selectUsers,
    selectPostureEvents,
    selectPostureEventsByUser,
    selectEmotionEventsByUser,
} = require('../models/models.js')

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getPostureEvents = (req, res, next) => {
    selectPostureEvents().then((events) => {
        res.status(200).send({ events })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getPostureEventsByUser = (req, res, next) => {
    const { user_id } = req.params
    selectPostureEventsByUser(user_id).then((events) => {
        res.status(200).send({ events })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getEmotionEventsByUser = (req, res, next) => {
    const { user_id } = req.params
    selectEmotionEventsByUser(user_id).then((events) => {
        res.status(200).send({ events })
    })
    .catch((err) => {
        next(err)
    })
}