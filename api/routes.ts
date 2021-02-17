let router = require('express').Router();
const uuid = require('node-uuid');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');


router.post('/users/create', UserController.createTempUserDocument);

module.exports = router;