const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const post = await Post.create({ content: req.body.content, userId: req.user.id });
  res.status(201).json(post);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('userId', 'name').sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
