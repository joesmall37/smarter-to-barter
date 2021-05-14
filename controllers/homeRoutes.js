const router = require("express").Router();
const { User, Service, Offer } = require("../models");
const withAuth = require("../utils/auth");

// rener the homepage

router.get("/", (req, res) => {
  res.render("homepage");
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
router.get("/userprofile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{model: Offer}, {model: Service}]
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render("userprofile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
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

router.get("/howitworks", (req, res) => {
  res.render("howitworks");
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/"); // this needs to redirect to /userprofile
    return;
  }

  res.render("signup");
});

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
    .then(dbServiceData => {
     const servicesData = dbServiceData.map(service => service.get({plain: true}))
     console.log(servicesData);
     res.render('service', {
       services: servicesData,
       logged_in: req.session.logged_in
     })
    })

    // if there was a server error, return the error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
