const express = require('express');

const beanController = require('../controllers/beanController');
const userController = require('../controllers/userController');

const checkRequestBody = require('../middleware/checkRequestBody');

const router = express.Router();

router.route('/').get(beanController.getAllProducts);

router.route('/order-guest').post(checkRequestBody, beanController.postOrderGuest);
router.route('/order/status/:id').get(beanController.getOrderStatus);

// Skyddar routes nedan. Sparar även användaren i req.user.
router.use(userController.protect);

router.route('/order/history').get(beanController.getOrderHistory);
router.route('/order').post(checkRequestBody, beanController.postOrder);

router.route('/order/active-orders').get(beanController.getActiveOrders);

module.exports = router;
