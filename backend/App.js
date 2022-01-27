const express=require('express');
const cors = require('cors');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

const neostoreRoutes = require('./routes/neostoreRoutes');
app.use("/api/neostore/",neostoreRoutes);
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`work on ${PORT}`);
})