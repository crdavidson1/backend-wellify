const db = require('../db/connection.js')
const format = require('pg-format')

exports.selectCustomers = () => {
    return db.query('SELECT * FROM wellify.customers;').then((result) => {
        return result.rows
    })
}