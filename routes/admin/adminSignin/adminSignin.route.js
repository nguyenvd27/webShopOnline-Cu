const express = require('express');

const controller = require('../../../controllers/admin/adminSignin/adminSignin.controller');
var router = express.Router();

router.use(express.static('public'));

router.get('/',controller.signin );
router.post('/',controller.postSignin );

module.exports = router;