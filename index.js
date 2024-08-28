const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require("./model/Employee.js");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/Intergration")
app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    console.log("Success")
    .catch(err=>res.json(err))
});

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    console.log("password",password)
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user.password==password)
        {
            res.json("success");
        }
        else
            {
                res.json("incorrect password");
            }
    })
});
app.listen(3001,()=>{
    console.log("server is running");
});
