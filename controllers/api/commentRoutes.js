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
    try {
        await Comment.create(req.body, {
          where: {
            id: req.session.user_id,
            forum_id: req.session.forum_id,
            comment_text: req.session.comment_text,
          },
        });
    
        res.status(200).json('new comments created');
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});