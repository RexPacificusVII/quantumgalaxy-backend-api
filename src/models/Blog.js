const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date_published: { type: Date, default: Date.now },
  image: { type: String },
  category: { type: String },
  tags: { type: [String] },
  summary: { type: String },
  content: { type: String },
});

// Middleware to set date_published to GMT+8 before saving
blogSchema.pre('save', function (next) {
  // Ensure that the date_published field is not explicitly set before applying the default value
  if (!this.date_published) {
    this.date_published = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
