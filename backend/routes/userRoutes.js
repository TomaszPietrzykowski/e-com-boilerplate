const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware.js');

router
  .route('/')
  .post(userController.registerUser)
  .get(auth.protect, auth.admin, userController.getUsers);
router.post('/login', userController.authUser);
router
  .route('/profile')
  .get(auth.protect, userController.getUserProfile)
  .put(auth.protect, userController.updateUserProfile);
router
  .route('/:id')
  .get(auth.protect, auth.admin, userController.getUserById)
  .delete(auth.protect, auth.admin, userController.deleteUser)
  .put(auth.protect, auth.admin, userController.updateUser);

module.exports = router;
