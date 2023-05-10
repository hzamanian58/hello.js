const joi = require('joi')
const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');
const {
  customerValidate,
  updateCustomerValidate,
} = require('../validators/CustomerValidators');

const schemaUser = new mongoose.Schema({
    name : {type: String, required: true},
    phone : {type: String, required: true, uniqe: true},
    password : {type: String, required: true},
});

const UserModel = mongoose.model('User', schemaUser);

async function createUser(name, phone, password){
    let user = new UserModel({
        name,
        phone,
        password,
    });
    user = await user.save();
    console.log(user);
    res.send(user);
}


router.post("/api/login", (req, res)=>{
    // input validation
    const schema = joi.object({
        phone: joi.string().required().min(11).max(11),
        password: joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({message: "لطفا مقادیر را به درستی وارد کنید"});
    createUser(req.body.phone, req.body.password)

})
