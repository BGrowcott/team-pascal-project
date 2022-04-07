const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const forumRoutes = require('./forumRoutes');



router.use('/accounts', accountRoutes);
router.use('/forums', forumRoutes);




module.exports = router;