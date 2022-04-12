const router = require('express').Router();
const { Forum } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const newForum = await Forum.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newForum);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;