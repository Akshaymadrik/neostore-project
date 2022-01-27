const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const helpers=require('../helpers/helpers');
const transporter=require('../Controller/Emailtransporter');
const jwtsecret = 'shfdjd43kskdj5jfdk';
const userModel=require('../db/userSchema');
const {validateLogin,validateUser} =require('./validator')
const {postdata,login,editdata,adddata,userData}=require('../Controller/userController');
const productModel=require('../db/productSchema')
const categoryModel=require('../db/categorySchema')
const orderModel=require('../db/order')
const {getCategoryProducts,getColorProducts,getAllCategories,getAllColors,getOrder,getOrderById,getOrd,getCart}=require('../Controller/productController');
router.use(express.static("uploads"));
const db=require('../config/db');

db();
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}
router.post('/social',(req,res)=>{
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let data={firstname:firstname,lastname:lastname,email:email}
    let userdata=userData(email);
    userdata.then(response=>{
    if(response.email){
        let payload={
            uid:email
        }
        const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
        res.json({msg: "Logged in successfully","token":token,user:data,status_code:200})
 
    }
    else{
        let ins=new userModel({firstname:firstname,lastname:lastname,email:email})
        ins.save((err)=>{
            if(err){ return err;
        }
        else{
            let payload={
                uid:email
            }
            const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
            res.json({msg: "Logged in successfully","token":token,user:data,status_code:200})
     
        
    }
})
}
})
})
router.get('/userdata/:email',authenticateToken,(req, res)=>{
    let email=req.params.email
    const user = userData(email);
    user.then(response=>
        res.json({user:response}))
});
router.put('/updatedata',authenticateToken,(req,res)=>{
    let email=req.body.email;
    editdata(email,req.body);
    res.json({msg:"updated",user:req.body})
})
router.post('/changepassword',authenticateToken,(req,res)=>{
    let password=req.body.password;
    let old_password = req.body.old_password;
    let email = req.body.email
    userModel.findOne({email:email}, (err, info)=>{
        if(err) {
            res.json({err:1, msg:"Fetch error"})
            }
            else if(info===null){
                res.json({err:1, msg:"User data not found"})
            }else{
                if(bcrypt.compareSync(old_password, info.password)){
                    const hash = bcrypt.hashSync(password, saltRounds);
                    userModel.updateOne({email:email},{$set:{password:hash}},(err)=>{
                        if(err){
                            res.json({err:1, msg:"Update error"})
                        }
                        else{
                            res.json({err:0,msg:"Updated successfully"})
                        }
                    })
                }
                else{
                    res.json({err:1,msg:"Correctly enter the old password"})
                }
            }
        })

})
router.post('/addaddress/:email',authenticateToken,(req,res)=>{
    let email=req.params.email;
    console.log(email)
    let address=req.body.address;
    let pincode=req.body.pincode;
    let city=req.body.city;
    let state=req.body.state;
    let country=req.body.country;
    let data={address:address,pincode:pincode,city:city,state:state,country:country}
    const add=adddata(data,email);
    res.json({"msg":"updated succesfull"})
})
router.post('/register',validateUser,(req,res)=>{
let firstname=req.body.firstname;
let lastname=req.body.lastname;
let email=req.body.email;
let password=req.body.password;
let phone_number=req.body.phone_number;
let gender=req.body.gender;
const hash = bcrypt.hashSync(password, saltRounds);
let data={firstname:firstname,lastname:lastname,email:email,password:hash,gender:gender,phone_number:phone_number};
const postdata1 =  postdata(data);
res.json({"msg":"registered successfully"});

})
router.post('/login',

(req,res)=>{
   
    let{email, password} = req.body;
    const logindata = userData(email);
    logindata.then(response=>{
        console.log(response);
        if(response.email){
            if(bcrypt.compareSync(password, response.password)){
                let payload={
                    uid:email
                }
                const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                res.json({msg: "Logged in successfully","token":token,user:response,status_code:200})
            }
            else{
                res.json({err:"Password Error",status_code:400})
            }
        }
        else{
            res.json({err:"Email doesn't exists",status_code:400});
        }
    })

})
router.get('/forgot/:email',(req, res)=>{
    let email = req.params.email;
    let mailOptions = {
            from: 'sriaj711@gmail.com',
            to: email,
            subject: 'Password change for Neostore',
            html: `<p>Please find attached link for resetting the password
            </p><a href="http://localhost:3000/forgotpass">http://neostore.com/forgot_password</a>`
          };
          transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                res.json({err:"Email error"})
            } else {
              console.log('Email sent: ' + info.response);
              res.json({msg:"Email sent successfully for reset the password"})
            }
          })
})
router.post('/forgot/change/:email', (req, res)=>{
    let {email} = req.params;
    console.log(email);
    let {password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const userdata = userData(email);
    userdata.then(response=>{
        console.log(response)
            if(response.email){
                userModel.updateOne({email:email},{$set:{password:hash}},(err)=>{
                    if(err){
                        res.json({err:err})
                    }
                    else{
                        res.json({msg:"Password updated successfully"})
                    }
                })
            }
    })
})
router.post('/uploadlogo/:email',authenticateToken,(req,res)=>{
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('myfile');
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.json({err:req.fileValidationError});
        }
        else if(!req.file){
            res.json({err:"Please select a file"});
        }
        else if(err){
            res.json({err:"Some file uploading error"});
        }
        let email=req.params.email;
        let logo=req.file.filename;
        userModel.updateOne({email:email},{$set:{logo:logo}},(err)=>{
            console.log(logo)
            if(err){
                res.json({err:"Update Error"});
            };
            res.json({msg: "Update successfully",logo:logo})
        });
    })  
})
router.put('/updaddress/:email',authenticateToken,(req, res)=>{
    let email = req.params.email;
    let address=req.body.address_line;
    let pincode=req.body.pincode;
    let city=req.body.city;
    let state=req.body.state;
    let country=req.body.country;
    console.log(req.body);
     userModel.updateOne({email:email,'address.pincode':pincode}
    ,{'$set':{
        'address.$.address_line':address,
        'address.$.city':city,
        'address.$.state':state,
        'address.$.country':country
    }}
,(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Update error"})
        }
        else{
            const userdata = userData(email);
    userdata.then(response=>{
    res.json({"msg":"updated succesfully",userdata:response})
    })
        }
    })
})

router.post('/deleteaddress/:email',authenticateToken, (req, res)=>{
    let email = req.params.email;
    let pincode=req.body.pincode;
    userModel.updateOne({email:email}, { "$pull": { "address": { "pincode": pincode } }},(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Delete error"})
        }
        else{
            const userdata = userData(email);
    userdata.then(response=>{
    res.json({"msg":"Deleted succesfully",userdata:response})
    })
        }
    })
})
router.get('/getcategory/:id',(req,res)=>{
    let id=req.params.id;
    const category_product = getCategoryProducts(id);
    category_product.then(response=>{
        console.log(response);
        res.json({categoryProduct:response});
    })

})
router.get('/getdata',(req,res)=>{
    productModel.find({}).populate(['category_id', 'color_id']).then(response=>{
        console.log(response)
        res.json({products:response});
    })
})
router.post('/updlogo/:email',(req,res)=>{
    let email=req.params.email;
    userModel.findOne({email:email}),(err,info)=>{
            if(err){
                res.json({err:"error ocurred"})
            }else{
                res.json({logo1:info})
            }
    }
})
router.get('/getcat',(req,res)=>{
    categoryModel.find({}).then(response=>{
        console.log(response)
        res.json({category:response});
    })
})

router.get('/categories', (req, res)=>{
    const categories = getAllCategories();
    categories.then(response=>{
        console.log(response)
        res.json({categories:response});
    })
})

router.get('/colors', (req, res)=>{
    const colors = getAllColors();
    colors.then(response=>{
        res.json({colors:response});
    })
})

router.get('/categoryproducts/:id', (req, res)=>{
    let id = req.params.id;
    const products = getCategoryProducts(id);
    products.then(response=>{
        res.json({products:response});
    })
})

router.get('/colorproducts/:id', (req, res)=>{
    let id = req.params.id;
    const products = getColorProducts(id);
    products.then(response=>{
        res.json({products:response});
    })
})

router.post('/addtocart',authenticateToken,(req, res)=>{
    let {id, email} = req.body;
    console.log(email)
    const order_data = getOrderById(id, email);
    order_data.then(response=>{
        if(response){
            res.json({err:"Product already added to cart"})
        }
        else{
            let order_ins = new orderModel({email:email, product_id:id})
            order_ins.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({err:err});
                }
                else{
                    res.json({msg:"Product added to cart successfully"});
                }
            })
            
        }
    })

})

router.get('/getcart/:email',authenticateToken,(req, res)=>{
    let {email} = req.params;
    const cart_data = getCart(email);
    cart_data.then(response=>{
        if(response){
            res.json({cart:response});            
        }
        else{
            res.json({err:"No products ordered"})
        }
    })
})

router.put('/incrementquantity',authenticateToken,(req, res)=>{
    let {email, product_id} = req.body;
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:1}},(err)=>{
        if(err){
            res.json({err:err})
        }
        else{
            res.json({msg:"Incremented successfully"});
        }
    })
})
router.put('/decrementquantity',authenticateToken,(req, res)=>{
    let {email, product_id} = req.body;
    const order_data = getOrderById(product_id, email);
    order_data.then(response=>{
        if(response.quantity === 1){
            res.json({err:'Product cannot be decremented'});
        }
        else{
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:-1}},(err)=>{
        if(err){
            res.json({err:err})
        }
        else{
            res.json({msg:"Decremented successfully",status_code:200});
        }
    })
}
    })
})

router.delete('/deleteorder/:id',authenticateToken,(req, res)=>{
    let {id} = req.params;
    orderModel.deleteOne({_id:id},(err)=>{
        if(err){
            res.json({err:"Delete error"});
        }
        else{
            res.json({msg:"Cart Item deleted successfully"});
        }
    })
})

router.get("/getproduct/:id", (req, res) => {
    let id = req.params.id
    productModel.findOne({ _id: id })
        .populate("color_id")
        .then(product => {
            console.log(product);
            res.json({ product: product, err: "0", image: product.product_subimages })
         
        })

})
router.post('/addrate/:id',authenticateToken,(req,res)=>{
    let id=req.params.id;
    let rate=req.body.rate;
    productModel.updateOne({_id:id},{$set:{product_rating:rate}},(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Update error"})
        }
        else{
            res.json({msg:"Update successfull"})
        }
    })
})

router.put('/checkout',authenticateToken, (req, res)=>{
    let {email, address} = req.body;
    orderModel.updateMany({email:email, checkout:false},{$set:{checkout:true,address:address}}, (err)=>{
        if(err){
            res.json({err:err})
        }
        else{
            res.json({msg:"Order placed successfully"});
        }
    })
})
router.get('/getorder/:email',authenticateToken,(req, res)=>{
    let {email} = req.params;
    const order_data = getOrder(email);
    order_data.then(response=>{
        if(response){
            res.json({order:response});            
        }
        else{
            res.json({err:"No products ordered"})
        }
    })
})
router.get('/getorderbyid/:id',(req, res)=>{
    let {id} = req.params;
    const order_data = getOrd(id);
    order_data.then(response=>{
        if(response){
            res.json({order:response});            
        }
        else{
            res.json({err:"No products ordered"})
        }
    })
})
module.exports=router;