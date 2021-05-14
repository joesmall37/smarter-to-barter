// module.exports = router;
// Dependencies
// the router and the database
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const { Post, User, Comment } = require('../models');
// the authorization middleware to redirect unauthenticated users to the login page
const withAuth = require('../utils/auth')

// A route to render the user profilepage, only for a logged in user
router.get('/', withAuth, (req, res) => {
    // All of the users posts are obtained from the database
    Service.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'description',
            'name',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'service_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbServiceData => {
            // serialize data before passing to template
            const servics = dbServiceData.map(service => service.get({ plain: true }));
            res.render('userprofile', { servics, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route to edit a service
router.get('/edit/:id', withAuth, (req, res) => {
    // All of the users posts are obtained from the database
    Services.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'description',
            'name',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'service_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbServiceData => {
            // if no service by that id exists, return an error
            if (!dbServiceData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            // serialize data before passing to template
            const service = dbServiceData.get({ plain: true });
            res.render('edit-service', { service, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
    // Acess the User model and run the findOne() method to get a single user based on parameters
    User.findOne({
        // when the data is sent back, exclude the password property
        attributes: { exclude: ['password'] },
        where: {
            // use id as the parameter for the request
            id: req.session.user_id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // if no user is found, return an error
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            // otherwise, return the data for the requested user
            const user = dbUserData.get({ plain: true });
            res.render('edit-user', { user, loggedIn: true });
        })
        .catch(err => {
            // if there is a server error, return that error
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
