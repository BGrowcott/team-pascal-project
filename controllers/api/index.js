const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes');


router.use('/accounts', accountRoutes);
router.use('/forums', forumRoutes);
router.use('/users', userRoutes);




module.exports = router;