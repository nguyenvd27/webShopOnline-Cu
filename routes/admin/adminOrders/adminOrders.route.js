const express = require('express');

const controller = require('../../../controllers/admin/adminOrders/adminOrders.controller');

var router = express.Router();

router.use(express.static('public'));

router.get('/',controller.order );
router.get('/:id', controller.orderView);


module.exports = router;