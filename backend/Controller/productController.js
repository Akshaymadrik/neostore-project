const categoryModel=require('../db/categorySchema');
const colorModel=require('../db/colorSchema');
const productModel=require('../db/productSchema')
const orderModel =require('../db/order')
const getCategoryProducts = (id)=>{
    return productModel.find({'category_id':id})
.populate(["category_id","color_id"])
.exec();
}

const getColorProducts = (id)=>{
    return productModel.find({'color_id':id})
.populate(["category_id","color_id"])
.exec();
}

const getAllCategories=()=>{
    return categoryModel.find({}).exec();
}

const getAllColors=()=>{
    return colorModel.find({}).exec();
}
const getOrderById = (id, email) =>{
    return orderModel.findOne({product_id:id, email:email,checkout:false}).exec();
}

const getCart = (email) =>{
    return orderModel.find({email:email,checkout:false}).populate(['product_id'])
    .exec();
}
const getOrder = (email) =>{
    return orderModel.find({email:email,checkout:true}).populate(['product_id'])
    .exec();
}
const getOrd = (id) =>{
    return orderModel.findOne({_id:id}).populate(['product_id']).exec();
}
module.exports = {getCategoryProducts,getColorProducts,getAllCategories,getAllColors,getOrderById,getCart,getOrder,getOrd};