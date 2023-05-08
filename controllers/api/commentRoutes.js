// SERVER SIDE - CREATE NEW COMMENT

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//==========================================================================
// CREATE NEW COMMENT

// for api/comment route

router.post('/', withAuth, async (req, res) => {
  try {
    const { comment, postId } = req.body;

    const newComment = await Comment.create({
      comment: comment,
      user_id: req.session.user_id,
      post_id: postId,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;