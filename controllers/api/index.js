const router = require('express').Router();
const accountRoutes = require('./accountRoutes');



router.use('/accounts', accountRoutes);




module.exports = router;