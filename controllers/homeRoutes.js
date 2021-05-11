const router = require('express').Router();
const { User, Service } = require('../models');
const withAuth = require('../utils/auth');

// rener the homepage

router.get("/", (req, res) => {

  res.render('homepage')
});


// render the user profile page

// router.get('/userprofile', (req,res) => {

// })// render the service
//   .then(dbServiceData => {
//     // create an array for the service, using the get method to trim extra sequelize object data out
//     const services = dbServiceData.map(service => service.get({ plain: true }));
//     // pass the services into the profile template
//     res.render('userprofile', {
//       services,
//       loggedIn: req.session.loggedIn
//     });
//   })
//   // if there was a server error, return the error
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });



// // render the profile page
// router.get('/profile', (req, res) => {

// })// render the service
//   .then(dbServiceData => {
//     // create an array for the service, using the get method to trim extra sequelize object data out
//     const services = dbServiceData.map(service => service.get({ plain: true }));
//     // pass the services into the profile template
//     res.render('profile', {
//       services,
//       loggedIn: req.session.loggedIn
//     });
//   })
//   // if there was a server error, return the error
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });


// // render the login page


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});



module.exports = router;
