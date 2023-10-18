const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  description: Object,
  images: [String], // You can store image URLs here
  user: String,
});

module.exports = mongoose.model("Memory", memorySchema);
