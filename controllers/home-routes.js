const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    res.render('homepage', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET a blog for individual blag's page
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, {model: Comment}],
    });
    if (!blog) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.render('homeItemDetails', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET all blogs for user's dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { creator_id: 3 },
      include: [{ model: User }, { model: Comment }],
    });
    res.render('dashboard', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.get('/dashboard/create', async (req, res) => {
  res.render('CRUDPost', { loggedIn: req.session.loggedIn });
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
