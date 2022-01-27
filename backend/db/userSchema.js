const mongoose=require('mongoose');
const userSchema=new  mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   phone_number:{
        type:Number,
     
    },
    gender:{
        type:String,
       
    },
    address:{
        type:Array   
    },
    password:{
        type:String,
       
    },
    logo:{
        type:String
    },
    dob:{
        type:Date
    }
})
module.exports=mongoose.model('user',userSchema)