const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//==========================================================================
// CREATE NEW POST

router.post('/', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({
      title: title,
      post: content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;