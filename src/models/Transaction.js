const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');

const transactionSchema = new mongoose.Schema({
  type: { type: String, default: 'purchase' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      unit_price: { type: Number, required: true },
    },
  ],
  total_amount: { type: Number, required: true },
  transaction_date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
