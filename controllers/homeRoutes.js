const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//==========================================================================
// HOME PAGE - LIST OF ALL POSTS
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      },],
    });
    
    // Serialize data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//==========================================================================
// POST PAGE - POSTS BY ID
router.get('/post/:id', async (req, res) => {
  try {
    // Grab post based on id
    const postData = await Post.findByPk(req.params.id, {
      include: [{
          model: User,
          attributes: ['username'],
        }],
    });

    // Check if post exists
    if (!postData) {
      res.status(404).render('404');
      return;
    }

    // Serialize data
    const post = postData.get({ plain: true });

    // Render post view
    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//==========================================================================
// LOGIN PAGE - REDIRECTS TO DASHBOARD IF USER IS ALREADY LOGGED IN
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Post, 
      }],
    });

    const user = userData.get({ plain: true });
    const posts = user.posts;

    res.render('dashboard', {
      user,
      posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//==========================================================================
// LOGIN PAGE - REDIRECTS TO DASHBOARD IF USER IS ALREADY LOGGED IN
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});


//==========================================================================
// SIGNUP PAGE - REDIRECTS TO DASHBOARD IF USER IS ALREADY SIGNED UP
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});


module.exports = router;