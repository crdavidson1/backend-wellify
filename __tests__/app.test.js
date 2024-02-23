const app = require('../app');
const request = require('supertest')
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const {articleData, commentData, topicData, userData} = require('../db/data/test-data/index.js');
const endpointsFile = require('../endpoints.json')

beforeEach(() => seed({ articleData, commentData, topicData, userData }));
afterAll(() => db.end());

describe('General request errors', () => {
    test('Request to an invalid endpoint receives a 404 error', () => {
        return request(app)
        .get('/api/forklift')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not found')
        })
    })
})
describe('/api/topics', () => {
    test('GET:200 sends an array of topic objects to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3)
            response.body.topics.forEach((topic) => {
                expect(typeof topic.slug).toBe('string')
                expect(typeof topic.description).toBe('string')
            })
        })
    })
})
describe('/api', () => {
    test('GET:200 provides a description of all other endpoints available which matches the endpoints.json file', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const endpointDescriptions = response.body
            expect(endpointDescriptions).toEqual(endpointsFile)
            Object.values(endpointDescriptions).forEach((endpoint) => {
                if (endpoint.description) expect(typeof endpoint.description).toBe('string')
                if (endpoint.queries) expect(typeof endpoint.queries).toBe('object')
                if (endpoint.exampleResponse) expect(typeof endpoint.exampleResponse).toBe('object')
                if (endpoint.bodyFormat) expect(typeof endpoint.bodyFormat).toBe('string')
            })
        })
    })
})
describe('/api/articles/:article_id', () => {
    test('GET:200 sends a single article to the client', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
            expect(response.body.article.article_id).toBe(1)
            expect(response.body.article.title).toBe('Living in the shadow of a great man');
            expect(response.body.article.topic).toBe('mitch');
            expect(response.body.article.author).toBe('butter_bridge')
            expect(response.body.article.body).toBe('I find this existence challenging')
            expect(response.body.article.created_at).toBe('2020-07-09T20:11:00.000Z')
            expect(response.body.article.votes).toBe(100)
            expect(response.body.article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    })
    test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
    });
    test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/not-a-team')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
    });
    test('PATCH:200 increases the votes property on an article by a given value', () => {
        const newVotes = {inc_votes: 10}
        return request(app)
        .patch('/api/articles/1')
        .send(newVotes)
        .expect(200)
        .then((response) => {
            expect(response.body.comment.votes).toBe(110)
        })
    })
    test('PATCH:200 decreases the votes property on an article by a given negative value', () => {
        const newVotes = {inc_votes: -10}
        return request(app)
        .patch('/api/articles/1')
        .send(newVotes)
        .expect(200)
        .then((response) => {
            expect(response.body.comment.votes).toBe(90)
        })
    })
    test('PATCH:400 sends an appropriate status and error message when given an invalid id', () => {
        const newVotes = {inc_votes: -10}
        return request(app)
          .patch('/api/articles/not-a-team')
          .send(newVotes)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
    });
    test('PATCH:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        const newVotes = {inc_votes: -10}
        return request(app)
          .patch('/api/articles/999')
          .send(newVotes)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
    });
    test('PATCH:204 sends no response when given an empty object', () => {
        const newVotes = {}
        return request(app)
          .patch('/api/articles/3')
          .send(newVotes)
          .expect(204)
    })
    test('PATCH:204 sends no response when given an empty array', () => {
        const newVotes = []
        return request(app)
          .patch('/api/articles/3')
          .send(newVotes)
          .expect(204)
    })
    test('PATCH:400 sends an appropriate status and error message when given an object with an invalid key', () => {
        const newVotes = {hobbies: 'tennis'}
        return request(app)
          .patch('/api/articles/3')
          .send(newVotes)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
    });
    test('PATCH:200 ignores unnecessary properties', () => {
        const newVotes = {inc_votes: 10, hobbies: 'golf', author: 'test'}
        return request(app)
        .patch('/api/articles/1')
        .send(newVotes)
        .expect(200)
        .then((response) => {
            expect(response.body.comment.votes).toBe(110)
        })
    })
})
describe('/api/articles', () => {
    test('GET:200 sends an array of article objects to the client', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.articles[0].comment_count).toBe("2")
            expect(response.body.articles.length).toBe(13)
            response.body.articles.forEach((article) => {
                expect(typeof article.article_id).toBe('number')
                expect(typeof article.title).toBe('string');
                expect(typeof article.topic).toBe('string');
                expect(typeof article.author).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
                expect(typeof article.comment_count).toBe('string')
                expect(article).not.toHaveProperty('body')
            })
        })
    })
    test('GET:200 sends an array of article objects sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', {descending: true})
        })
    })
})
describe('/api/articles/:article_id/comments', () => {
    test('GET:200 sends all of the comments from an article to the client with all the desired properties sorted by recency', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then((response) => {
            expect(response.body.comments).toBeSortedBy('created_at', {descending: true})
            response.body.comments.forEach((comment) => {
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.votes).toBe('number');
                expect(typeof comment.created_at).toBe('string');
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.body).toBe('string')
                expect(comment.article_id).toBe(3)
            })
        })
    })
    test('GET:200 sends an empty array when given a valid article id which has no associated comments', () => {
        return request(app)
          .get('/api/articles/2/comments')
          .expect(200)
          .then((response) => {
            expect(response.body.comments).toEqual([]);
          });
    })
    test('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999/comments')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
          });
    });
    test('GET:400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .get('/api/articles/not-an-id/comments')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          });
    });
    test('POST:201 inserts a new comment to the comments database and sends the new comment back to the client', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            username: "rogersop",
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment.comment_id).toBe(19)
            expect(response.body.comment.body).toBe("Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.")
            expect(response.body.comment.author).toBe('rogersop')
            expect(response.body.comment.article_id).toBe(1)
            expect(response.body.comment.votes).toBe(0)
            expect(response.body.comment).toHaveProperty('created_at')
        })
    })
    test('POST:201 ignores unnecessary properties', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            username: "rogersop",
            hobbies: 'tennis'
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment.comment_id).toBe(19)
            expect(response.body.comment.body).toBe("Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.")
            expect(response.body.comment.author).toBe('rogersop')
            expect(response.body.comment.article_id).toBe(1)
            expect(response.body.comment.votes).toBe(0)
            expect(response.body.comment).toHaveProperty('created_at')
        })
    })
    test('POST:400 responds with an appropriate status and error message when provided with an incomplete comment object (no username)', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus."
        }
        return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
    test('POST:400 responds with an appropriate status and error message when provided with an incomplete comment object (no body)', () => {
        const newComment = {
            username: "rogersop",
        }
        return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
    test('POST:404 responds with an appropriate status and error message when given a valid article_id that does not exist', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            username: "rogersop",
        }
        return request(app)
          .post('/api/articles/999/comments')
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
        });
    });
    test('POST:400 responds with an appropriate status and error message when given an invalid article_id', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            username: "rogersop",
        }
        return request(app)
          .post('/api/articles/not-an-id/comments')
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
    test('POST:404 responds with an appropriate status and error message when username does not exist', () => {
        const newComment = {
            body: "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            username: "test123",
        }
        return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('article does not exist');
        });
    });
})
describe('/api/comments/:comment_id', () => {
    test('DELETE:204 deletes the specified comment and sends no body back', () => {
        return request(app).delete('/api/comments/3')
    })
    test('DELETE:404 responds with an appropriate status and error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/comments/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('comment does not exist');
        });
    });
    test('DELETE:400 responds with an appropriate status and error message when given an invalid id', () => {
        return request(app)
          .delete('/api/comments/not-a-comment')
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });  
})