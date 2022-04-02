const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Forum } = require('../models');


//Homepage
router.get('/', async (req, res) => {
    try {
      res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
});


// Log in page
router.get('/login', async (req, res) => {
  try {
    res.render('login');
    } catch (err) {
      res.status(500).json(err);
    }
});


// Profile page
router.get('/profile', async (req, res) => {
  try {
    res.render('profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/forums', async (req, res) => {
  try {

    const forumData = await Forum.findAll();

    const forums = forumData.map((forum) => forum.get({ plain: true }));

    res.render('forums', {forums});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;