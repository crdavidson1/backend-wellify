const {
    selectCustomers,
    selectEvents
} = require('../models/models.js')

exports.getCustomers = (req, res, next) => {
    selectCustomers().then((customers) => {
        res.status(200).send({ customers })
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