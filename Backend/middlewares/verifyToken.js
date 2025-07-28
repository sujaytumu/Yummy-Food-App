const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ error: 'Access token missing' });
        }

        const decoded = jwt.verify(token, secretKey);

        const vendor = await Vendor.findById(decoded.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        req.vendorId = vendor._id; // Attach vendorId for next middleware/controller
        next();
    } catch (error) {
        console.error('[Token Verification Error]:', error.message);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
