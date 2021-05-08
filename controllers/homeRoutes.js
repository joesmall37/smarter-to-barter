const router = require('express').Router();
const { User, Service } = require('../models');
const withAuth = require('../utils/auth');


router.get("/", (req, res) => {
  
  res.render('homepage')
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
