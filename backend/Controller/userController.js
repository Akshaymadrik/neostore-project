const userModel=require('../db/userSchema');
const categoryModel=require('../db/categorySchema');
const colorModel=require('../db/colorSchema');
const productModel=require('../db/productSchema')
const postdata=async(data)=>{
    let firstname=data.firstname;
    let lastname=data.lastname;
    let email=data.email;
    let password=data.password;
    let phone_number=data.phone_number;
    let gender=data.gender;
    let ins=new userModel({firstname:firstname,lastname:lastname,email:email,password:password,phone_number:phone_number,gender:gender})
    await ins.save((err)=>{
        if(err){ return err;
    }
    else{
        return("added suuccessfully")
    }
})
}
const adddata=(data,email)=>{
    let address=data.address;
    let pincode=data.pincode;
    let city=data.city;
    let state=data.state;
    let country=data.country;
    let data1={address_line:address,pincode:pincode,city:city,state:state,country:country};
    console.log(data1)
    userModel.updateOne({email:email},{$push:{address:data1}},(err)=>{
        if(err) {
            console.log(err)
        }
        else{

            console.log("updated data")
        }
    })
}
const editdata=(email,data)=>{
    userModel.updateOne({email:email},{$set:data},(err)=>{
        if(err) throw err;
        else{
            console.log("updated data")
        }
    })
}
const login=(data)=>{
    userModel.findOne({email:data.email,password:data.password}, (err, info)=>{
        if(err) {
            console.log(err);
            }
            else{
                return info
            }
    })
}
const userData = (email)=>{
    return userModel.findOne({email:email}).exec();
}
module.exports={postdata,login,editdata,adddata,userData};