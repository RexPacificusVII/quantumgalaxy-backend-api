const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  author: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  url_image: { type: String },
  published_at: { type: Date, default: Date.now },
  content: { type: String },
});

// Middleware to set published_at to GMT+8 before saving
newsSchema.pre('save', function (next) {
  // Ensure that the published_at field is not explicitly set before applying the default value
  if (!this.published_at) {
    this.published_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
  }
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
