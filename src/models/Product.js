const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0.00 },
  description: { type: String },
  features: { type: [String] },
  category: { type: [String] },
  subcategory: { type: [String] },
  image: { type: [String] },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
});

// Middleware to set created_at to GMT+8 before saving
productSchema.pre('save', function (next) {
  // Ensure that the created_at field is not explicitly set before applying the default value
  if (!this.created_at) {
    this.created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
