const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');

// @route GET /api/posts
// @desc Get post
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);
    res.json({ success: true, posts });
  } catch (err) {}
});

// @route POST /api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://') ? url : `https://${url}`,
      status: status || 'To learn',
      user: req.userId,
    });

    await newPost.save();

    res.json({
      success: true,
      message: 'Created post successfully. Happy learning!',
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route PUT /api/posts/:id
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: 'Title is required' });
  }

  try {
    let updatedPost = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'To learn',
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorized to update post or post not found
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorized',
      });
    }

    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);

    res.json({ success: true, message: `Well done ${posts[0].user.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// @route DELETE /api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorize or post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorized',
      });
    }

    res.json({ success: true, deletedPost: deletedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
