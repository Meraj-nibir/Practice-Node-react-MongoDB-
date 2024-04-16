const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECTRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


const mongoUrl = "mongodb+srv://admin:admin@atlascluster.clkighc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("Connected");
})
.catch((e)=>console.log(e));


require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) =>{
    const {fname, lname, email,password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            res.send({error: "user exists"})
        }
        await User.create({
           fname,
           lname,
           email,
           password: encryptedPassword, 
        })
        res.send({status: "Ok"})
    }
    catch(error){
        res.send({status:"error"})
    }
});

app.post("/login-user", async (req,res) =>{
    const [email,password] = req.body;

    const user =await User.findOne({email});
    if(!user){
        return res.json({error: "user not found"})
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email},JWT_SECTRET);

        if(res.status(201)){
            return res.json({status:"ok", data: token});
        }else{
            return res.json({error: "error"});
        }
    }

    res.json({status:"error", error: "Invalid password"});
});

app.post("/userData", async(req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token.JWT_SECTRET);
        const useremail = user.email;
        User.findOne({email:useremail}).then((data) => {
            res.send({status: "ok", data: data});
        }).catch((error)=>{
            res.send({status: "error", data:data});
        });
    }
    catch(error){

    }
});

app.listen(5000,()=>{
    console.log("Server started");
});
