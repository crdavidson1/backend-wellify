const {
    selectTopics,
    selectArticleById,
    selectArticles,
    selectCommentsById,
    insertComment,
    updateArticle,
    removeComment,
    selectUsers
} = require('../models/models.js')
const endpointDescriptions = require('../endpoints.json')

exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    const {topic, sort_by, order} = req.query
    selectArticles(topic, sort_by, order).then((articles) => {
        res.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users })
    })
    .catch((err) => {
        next(err)
    })
}

exports.getEndpoints = (req, res, next) => {
    res.status(200).send(endpointDescriptions)
    .catch((err) => {
        next(err)
    })
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article })
    }).catch((err) => {
        next(err)
    })
}

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params
    selectCommentsById(article_id).then((comments) => {
        res.status(200).send({ comments })
    }).catch((err) => {
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const newComment = req.body
    const { article_id } = req.params
    insertComment(newComment, article_id).then((comment) => {
        res.status(201).send({ comment })
    })
    .catch((err) => {
        next(err)
    })
}

exports.patchArticle = (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(204).send()
    }
    const newVote = req.body
    const { article_id } = req.params
    updateArticle(newVote, article_id).then((article) => {
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    })
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    removeComment(comment_id).then((err) => {
        res.status(204).send();
    })
    .catch((err)=>{
      next(err)
    })
};