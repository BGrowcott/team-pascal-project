const router = require('express').Router();
const { Forum, Follow } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create', withAuth, async (req, res) => {

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

router.post('/follow', withAuth, async (req, res) => {
  const alreadyFollowed = await Follow.findOne({
    where: { 
      ...req.body, 
      user_id: req.session.user_id 
    },
  });
  if(alreadyFollowed){
    res.status(200).json('Already Following');
    return
  }
  try {
    await Follow.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log('test')
    res.status(200).json('Created new follow');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//delete forum

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const delForum= await Forum.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      res.status(200).json(delForum);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

module.exports = router;
