const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  product_producer:{
    type: String,
    required: true,
  },
  product_material:{
    type:String,
    required:true,
  },
  price: {
    type: Number,
    required: true,
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
  },
  product_dimentions:{
    type:String,
    required:true,
  },
  rating: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  product_subimages:{
    type:String,
    required:true,
  },
});
module.exports = mongoose.model("product", productSchema);