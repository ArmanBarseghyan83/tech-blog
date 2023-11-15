const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

// Create a new blog
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create({...req.body, userId: req.session.currentUser.userId});
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// update a blog by its `id` value
router.put('/', async (req, res) => {
  try {
    const blog = await Blog.update(req.body, {
      where: { id: req.body.id },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a blog by its `id` value
router.delete('/', async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
