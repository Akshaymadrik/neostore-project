const mongoose = require("mongoose");
const catSchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    unique: true,
  },
  product_image:{
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("Category", catSchema);