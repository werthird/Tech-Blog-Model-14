const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//==========================================================================
// CREATE NEW POST

// for route = api/post
router.post('/', withAuth, async (req, res) => {
  try {
    // req.body from dashboard.js
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


//==========================================================================
// UPDATE POST

// for route = api/post
router.put('/update', withAuth, async (req, res) => {
  console.log('got to client side')
  try {
    const { title, content, postId } = req.body;

    // Update the post in the database
    const updatePost = await Post.update(
      { title: title, 
        post: content },
      {
        where: {
          id: postId,
        },
        returning: true,
      }
    );

    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



//==========================================================================
// DELETE POST

// for route = api/post
router.delete('/delete', withAuth, async (req, res) => {
  const { postId } = req.body;

  try {
    const postData = await Post.destroy({
      where: {
        id: postId,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;