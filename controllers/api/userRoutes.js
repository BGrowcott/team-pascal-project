const router = require('express').Router();
const { User } = require('../../models');

router.put('/profilepic', async (req, res) => {
    try {
        console.log(req.session)
        const newPicture = await User.update(req.body, {
          where: {
            id: req.session.user_id,
          },
        });
        res.status(200).json(newPicture);
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
  });

module.exports = router;