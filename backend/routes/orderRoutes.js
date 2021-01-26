const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const auth = require('../middleware/authMiddleware.js');

router
  .route('/')
  .post(auth.protect, orderController.addOrderItems)
  .get(auth.protect, auth.admin, orderController.getOrders);
router.route('/myorders').get(auth.protect, orderController.getMyOrders);
router.route('/:id').get(auth.protect, orderController.getOrderById);
router.route('/:id/pay').put(auth.protect, orderController.updateOrderToPaid);
router
  .route('/:id/deliver')
  .put(auth.protect, auth.admin, orderController.updateOrderToDelivered);

module.exports = router;
