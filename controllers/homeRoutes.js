const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Forum } = require('../models');

// This page controls what is displayed when the user navigates the site
// e.g /profile/:id will display the profile of the user with ":id"
// the html displayed to the users is found in the views folder

//Homepage
router.get('/', async (req, res) => {
    if (req.session.logged_in){
      res.redirect('/myprofile')
      return
    }
    try {
      res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
});

//Profile page
router.get('/profile/:id', withAuth, async (req, res) => {

  const id = req.params.id
  try {

    const userData = await User.findByPk(id, {
      where: {user_id: id},
      include: [
        {
          model: Forum,
        }
      ]
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      user,
      logged_in: req.session.logged_in, 
      accountId: req.session.account_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//my Profile 

router.get(`/myprofile`, withAuth, async (req, res) => {
  const id = req.session.account_id
  try {

    const userData = await User.findOne({
      where: {account_id: id},
      include: [
        {
          model: Forum,
        }
      ]
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      user,
      logged_in: req.session.logged_in, 
      accountId: req.session.account_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Forums page
router.get('/forums', async (req, res) => {
  try {

    const forumData = await Forum.findAll();

    const forums = forumData.map((forum) => forum.get({ plain: true }));

    res.render('forums', {
      forums,
      logged_in: req.session.logged_in, 
      accountId: req.session.account_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;