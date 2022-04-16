const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({commentData})

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
    try {
        const newComment= await Comment.create({
            user_id: req.session.user_id,
            forum_id: req.body.forum_id,
            content: req.body.content,
        });
    
        res.status(200).json(newComment);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delComment= await Comment.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        res.status(200).json(delComment);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});


module.exports = router;