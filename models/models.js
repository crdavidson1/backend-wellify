const db = require('../db/connection.js')

exports.selectUsers = () => {
    return db.query('SELECT * FROM wellify.users;').then((result) => {
        return result.rows
    })
}

exports.selectEvents = () => {
    return db.query('SELECT * FROM wellify.events;').then((result) => {
        return result.rows
    })
}

exports.selectEventsByUser = (user_id) => {
    return db.query('SELECT * FROM wellify.events WHERE user_id = $1;', [user_id]).then((result) => {
        return result.rows
    })
}