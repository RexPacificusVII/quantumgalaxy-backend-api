const mongoose = require('mongoose');
// const Transaction = require('./Transaction');
const Product = require('./Product');
const User = require('./User');

const reviewSchema = new mongoose.Schema({
  // transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
});

// Middleware to set created_at to GMT+8 before saving
reviewSchema.pre('save', async function (next) {
  // Ensure that the created_at field is not explicitly set before applying the default value
  if (!this.created_at) {
    this.created_at = new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore" });
  }

  // Update the associated product's rating
  try {
    const product = await Product.findById(this.product_id);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if this is a new review or an edit
    if (!this.isNew) {
      // Editing an existing review
      const originalReview = await this.constructor.findOne({ _id: this._id });
      if (originalReview.rating !== this.rating) {
        // Rating has been modified, adjust the count and rate accordingly
        product.rating.rate = parseFloat(((product.rating.rate * product.rating.count - originalReview.rating + this.rating) / product.rating.count).toFixed(2));
      }
    } else {
      // Adding a new review
      product.rating.rate = parseFloat(((product.rating.rate * product.rating.count + this.rating) / (product.rating.count + 1)).toFixed(2));
      product.rating.count += 1;
    }

    // Save the updated product
    await product.save();
  } catch (error) {
    console.error(`Error updating product rating: ${error.message}`);
  }

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
