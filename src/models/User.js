const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: [validator.isEmail, "Entered email is invalid"] },
  password: { type: String, required: true, select: false },
  image: { type: String, default: 'https://my-gadget-api-images.s3.ap-southeast-2.amazonaws.com/user0000.jpg' },
  role: { type: String, default: 'regular' },
  created_at: { type: Date, default: Date.now },
});

// Middleware to set created_at to GMT+8 before saving
userSchema.pre('save', async function (next) {
  // Ensure that the created_at field is not explicitly set before applying the default value
  if (!this.created_at) {
    this.created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
  }

  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
