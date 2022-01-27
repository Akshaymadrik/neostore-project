const mongoose=require('mongoose');
const colorSchema=new mongoose.Schema({
    color_name:{
        type:String,
        require:true,
        unique:true
    },
    color_code:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model("color", colorSchema);