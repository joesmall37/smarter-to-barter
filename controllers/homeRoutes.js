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
// Use withAuth middleware to prevent access to route
router.get('/userprofile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('userprofile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/profile', async (req, res) => {
  try {
    const userData = await Service.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});




//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       projects,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



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
