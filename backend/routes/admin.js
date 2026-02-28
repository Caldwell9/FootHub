const express = require('express');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Product routes
router.post('/products', adminAuth, addProduct);
router.put('/products/:id', adminAuth, updateProduct);
router.delete('/products/:id', adminAuth, deleteProduct);

// Order routes
router.get('/orders', adminAuth, getAllOrders);
router.put('/orders/:id', adminAuth, updateOrderStatus);

module.exports = router;