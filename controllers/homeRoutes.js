const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Forum } = require('../models');

// This page controls what is displayed when the user navigates the site
// e.g /profile/:id will display the profile of the user with ":id"
// the html displayed to the users is found in the views folder

//Homepage
router.get('/', async (req, res) => {
    try {
      res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
});

//Profile page
router.get('/profile/:id', /*withAuth,*/ async (req, res) => { //uncomment withAuth once logging in is set up

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
    console.log(user)
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

module.exports = router;