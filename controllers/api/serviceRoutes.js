// Dependencies
// Express.js connection
const router = require('express').Router();
// User Model, Post Model, and Comment Model
const { User, Service } = require('../../models');
// Sequelize database connection
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require('../../utils/auth');

const { Op } = require('sequelize');
// Routes

// GET api/services -- get all services
router.get('/', (req, res) => {
    Service.findAll({
        where: {
            user_id: {
                [Op.ne]: req.session.user_id,
            }
         },
        // Query configuration
        // From the  Service table, include the post ID, URL, title, and the timestamp from post creation
        attributes: [
            'id',
            'description',
            'name',
            'created_at',
        ],
        // Order the posts from most recent to least
        order: [['created_at', 'DESC']],
        // From the User table, include the post creator's user name
        // From the Comment table, include all comments
        include: [
            {
                model: User,
                exclude: ['password']
            },
            {
                model: Offer
            }
        ]
    })
        // return the services
        .then(dbServiceData => res.json(dbServiceData))
        // if there was a server error, return the error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET api/services/:id -- get a single service by id
router.get('/:id', (req, res) => {
    Service.findOne({
        where: {
            // specify the post id parameter in the query
            id: req.params.id
        },
        // Query configuration, as with the get all service route
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbServiceData => {
            // if no post by that id exists, return an error
            if (!dbServiceData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbServiceData);
        })
        .catch(err => {
            // if a server error occured, return an error
            console.log(err);
            res.status(500).json(err);
        });
});

// POST api/service -- create a new service
router.post('/', withAuth, async (req, res) => {
    // expects object of the form {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    console.log('hello')
    try {
        const newService = await Service.create({
            name: req.body.name,
            description: req.body.description,
            // qualifications: req.body.qualifications,
            user_id: req.session.user_id
        });
        res.status(200).json(newService);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// PUT api/posts/1-- update a post's title or text
router.put('/:id', withAuth, (req, res) => {
    Service.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbServiceData => {
            if (!dbServiceData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbServiceData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// DELETE api/posts/1 -- delete a post
router.delete('/:id', withAuth, (req, res) => {
    Service.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbServiceData => {
            if (!dbServiceData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbServiceData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
