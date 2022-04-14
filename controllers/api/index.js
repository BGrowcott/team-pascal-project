const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/accounts', accountRoutes);
router.use('/forums', forumRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);




module.exports = router;