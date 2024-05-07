const db = require('../db/connection.js')

exports.selectUsers = () => {
    return db.query('SELECT * FROM wellify.users;').then((result) => {
        return result.rows
    })
}

exports.selectPostureEvents = () => {
    return db.query('SELECT * FROM wellify.posture_events;').then((result) => {
        return result.rows
    })
}

exports.selectPostureEventsByUser = (user_id) => {
    return db.query('SELECT * FROM wellify.posture_events WHERE user_id = $1;', [user_id]).then((result) => {
        return result.rows
    })
}

exports.selectEmotionEventsByUser = (user_id) => {
    return db.query('SELECT * FROM wellify.emotion_events WHERE user_id = $1;', [user_id]).then((result) => {
        return result.rows
    })
}