const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth.js');
const formattedDate = require('../utils/helpers.js');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [{ model: User }],
    });

    const blogs = blogsData.map((el) => ({
      ...el.get(),
      user: el.user.get(),
      createdAt: formattedDate(el.get().createdAt),
    }));

    res.render('homepage', { loggedIn: req.session.loggedIn, blogs });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET a blog for individual blag's page
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User },
        {
          model: Comment,
          include: [{ model: User }],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }

    const blog = {
      ...blogData.get(),
      createdAt: formattedDate(blogData.createdAt),
      comments: blogData.comments.map((comment) => ({
        ...comment.get(),
        user: comment.user.get(),
      })),
    };

    res.render('blogDetails', { loggedIn: req.session.loggedIn, ...blog });
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
  res.render('CRUDBlog', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
