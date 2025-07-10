const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express()
const PORT = process.env.PORT || 4000;

dotEnv.config();

//Middlewares
app.use(cors())
app.use(bodyParser.json());

//mongo DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

// API Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

// React Frontend (Customer)
app.use(express.static(path.join(__dirname, "../Customer_Frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Customer_Frontend/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});