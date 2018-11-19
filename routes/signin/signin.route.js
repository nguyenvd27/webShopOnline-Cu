const express = require('express');

const controller = require('../../controllers/signin/signin.controller');
var router = express.Router();

router.get('/',controller.signin );
router.post('/',controller.postSignin );

module.exports = router;