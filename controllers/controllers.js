const {
    selectCustomers
} = require('../models/models.js')

exports.getCustomers = (req, res, next) => {
    selectCustomers().then((customers) => {
        res.status(200).send({ customers })
    })
    .catch((err) => {
        next(err)
    })
}