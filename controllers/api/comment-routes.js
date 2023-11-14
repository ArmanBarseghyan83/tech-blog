const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll({
        include: [{ model: User }, { model: Blog }],
      });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

// Create a new comment
router.post('/', async (req, res) => {
    try {
      const comment = await Comment.create({...req.body, creator_id: 1, blog_id: 3});
      res.status(200).json(comment);
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

module.exports = router  