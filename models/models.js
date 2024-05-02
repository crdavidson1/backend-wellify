const db = require('../db/connection.js')

exports.selectCustomers = () => {
    return db.query('SELECT * FROM wellify.customers;').then((result) => {
        return result.rows
    })
}

exports.selectEvents = () => {
    return db.query('SELECT * FROM wellify.events;').then((result) => {
        return result.rows
    })
}