// This is used by the app.js to connect to the routes. 
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;