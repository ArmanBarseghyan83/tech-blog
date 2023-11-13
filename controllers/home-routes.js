const router = require('express').Router();
const { Blog, Comment } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/', async (req, res) => {
  res.render('homepage', {loggedIn: req.session.loggedIn});
});

router.get('/blog-post/:id', async (req, res) => {
  res.render('homeItemDetails', {loggedIn: req.session.loggedIn});
});

router.get('/dashboard', async (req, res) => {
  res.render('dashboard', {loggedIn: req.session.loggedIn});
});

router.get('/dashboard/create', async (req, res) => {
  res.render('CRUDPost', {loggedIn: req.session.loggedIn});
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
