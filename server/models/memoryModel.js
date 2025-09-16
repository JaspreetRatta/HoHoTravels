<<<<<<< HEAD

const mongoose = require('mongoose');
=======
const mongoose = require("mongoose");
>>>>>>> 501cafe1cd16251b928ad9581ff1d06a9397c0f1

const memorySchema = new mongoose.Schema({
  title: String,
  location: String,
  date: Date,
  description: Object,
  images: [String], // You can store image URLs here
<<<<<<< HEAD
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
  },
});

module.exports = mongoose.model('Memory', memorySchema);
=======
  user: String,
});

module.exports = mongoose.model("Memory", memorySchema);
>>>>>>> 501cafe1cd16251b928ad9581ff1d06a9397c0f1
