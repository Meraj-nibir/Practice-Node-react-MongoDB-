const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");



const mongoUrl = "mongodb+srv://admin:admin@atlascluster.clkighc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("Connected");
})
.catch((e)=>console.log(e));



app.listen(5000,()=>{
    console.log("Server started");
});

app.post("/post", async (req,res) =>{
    console.log(req.body);
    const {data} = req.body;

    try{
        if(data=="Nibir"){
            res.send({status: ok});
        }
        else{
            res.send({status:"User not found"});
        }
    }
    catch(error){
        res.send({status:"Error"});
    }
});

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) =>{
    const {name, email, mobileNo} = req.body;
    try{
        await User.create({
           uname: name,
           email,
           phoneNo: mobileNo, 
        })
        res.send({status: "Ok"})
    }
    catch(error){
        res.send({status:"error"})
    }
});