let router = require('express').Router();
const uuid = require('node-uuid');
const SessionController = require('./controllers/SessionController');

router.post('/session/create', SessionController.createSession);

module.exports = router;