const db = require('../db/connection.js')

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;').then((result) => {
        return result.rows
    })
}

exports.selectArticles = () => {
    return db.query('SELECT articles.article_id, articles.author, title, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;').then((result) => {
        return result.rows
    })
}

exports.selectArticleById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return result.rows[0]
    })
}

exports.selectCommentsById = (article_id) => {
    return db.query('SELECT comments.* FROM comments RIGHT JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id, comments.comment_id ORDER BY created_at DESC;', [article_id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        if(result.rows[0].comment_id === null) {
            return []
        }
        return result.rows
    })
}

exports.insertComment = ({ body, username}, article_id) => {
    return db.query('INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;', [body, username, article_id])
    .then((result) => {
        return result.rows[0]
    })
}

exports.updateArticle = ({ inc_votes }, article_id) => {
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;', [inc_votes, article_id])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return result.rows[0]
    })
}