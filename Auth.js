// GET /api/customers
// POST  /api/customers {name, ...}
// UPDATE /api/customers/64651321641 {name, ...}
// DELETE /api/customers/64651321641

// Authentication مرز بین کاربر مهمان و کاربر لاگین شده
// Authorization سطح دسترسی بیشتر 

// POST /api/login {phone , password}
// POST /api/register {name, password, phone}

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const joi = require('joi')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schemaUser = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    phone : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

const UserModel = mongoose.model('User', schemaUser);

async function createUser(username, phone, password){
    try{

        let user = new UserModel({
            username,
            phone,
            password,
        });
        result = await user.save();
        console.log(result);
    }catch(err){
        console.log(err);
    };
}


app.post("/api/register", (req, res)=>{
    // input validation
    const schema = joi.object({
        name: joi.string().required().min(3).max(50).unique(),
        phone: joi.string().required().min(11).max(11).unique(),
        password: joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({message: error.message});
    // let user = new UserModel({
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     password: req.body.password,
    // })

    createUser(req.body.name, req.body.phone, req.body.password)
    res.send("user created")
     
})



mongoose
.connect("mongodb://127.0.0.1:27017/customers", {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log("DB is connected..")) 
.catch(err=> console.log("DB not connected", err))


const port = process.env.port || 3000
app.listen(port, (err)=>{
    if (err) console.log("server error", err)
    else console.log(`server is listen to port ${port}`)
})

