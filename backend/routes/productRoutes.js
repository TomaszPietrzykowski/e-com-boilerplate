const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const auth = require('../middleware/authMiddleware.js');

router
  .route('/')
  .get(productController.getProducts)
  .post(auth.protect, auth.admin, productController.createProduct);
router.get('/top', productController.getTopProducts);
router
  .route('/:id')
  .get(productController.getProductById)
  .put(auth.protect, auth.admin, productController.updateProduct)
  .delete(auth.protect, auth.admin, productController.deleteProduct);

router
  .route('/:id/reviews')
  .post(auth.protect, productController.createProductReview);

module.exports = router;
