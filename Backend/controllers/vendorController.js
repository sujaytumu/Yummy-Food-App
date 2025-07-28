const Vendor = require('../models/Vendor');
const Firm = require('../models/Firm'); // ✅ Firm model added
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();
const secretKey = process.env.JWT_SECRET;

// ✅ Register Vendor
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword
    });

    await newVendor.save();
    console.log('✅ Vendor registered:', email);
    res.status(201).json({ message: "Vendor registered successfully" });

  } catch (error) {
    console.error('❌ Error in vendorRegister:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Login Vendor
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email }).populate('firm');

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      success: "Login successful",
      token,
      vendorId: vendor._id,
      vendorUsername: vendor.username,
      vendorEmail: vendor.email,
      firmId: vendor.firm?._id || null,
      firmName: vendor.firm?.firmName || ""
    });

    console.log(`✅ Vendor logged in: ${email}, Token: ${token}`);

  } catch (error) {
    console.error('❌ Error in vendorLogin:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get All Vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.status(200).json({ vendors });
  } catch (error) {
    console.error('❌ Error in getAllVendors:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get Single Vendor by ID
const getVendorById = async (req, res) => {
  const vendorId = req.params.id;

  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({
      vendorId: vendor._id,
      vendorUsername: vendor.username,
      vendorEmail: vendor.email,
      firmId: vendor.firm?._id || null,
      firmName: vendor.firm?.firmName || "",
      vendor
    });

    console.log(`✅ getVendorById: firmId = ${vendor.firm?._id}`);

  } catch (error) {
    console.error('❌ Error in getVendorById:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorById
};
