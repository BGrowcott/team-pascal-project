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

//User page
router.get('/profile/:id', async (req, res) => {

  const id = req.params.id
  try {

    const userData = await User.findByPk(id);

    const user = userData.get({ plain: true });

    res.render('profile', {user});
  } catch (err) {
    res.status(500).json(err);
  }
});

//Forums page
router.get('/forums', async (req, res) => {
  try {

    const forumData = await Forum.findAll();

    const forums = forumData.map((forum) => forum.get({ plain: true }));

    res.render('forums', {forums});
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

module.exports = router;