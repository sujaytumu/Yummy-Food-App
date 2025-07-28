const vendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

// POST Routes
router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

// GET Routes
router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:id', vendorController.getVendorById); // ✅ FIXED: was /:apple

module.exports = router;
