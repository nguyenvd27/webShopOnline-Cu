const express = require('express');

const controller = require('../controllers/index.controller');
var router = express.Router();

router.get('/',controller.getProducts );

router.get('/logout', controller.logout);

module.exports = router;