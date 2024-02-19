const {selectTopics, selectArticleById} = require('../models/topics-models.js')
const endpointDescriptions = require('../endpoints.json')

exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics })
    })
}

exports.getEndpoints = (req, res, next) => {
    res.status(200).send(endpointDescriptions)
}

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id).then((article) => {
        if (!article) {
            next({status: 404, msg: 'article does not exist'})
        } else {
            res.status(200).send({ article })
        }
    })
    .catch((err) => {
        next(err)
    })
}