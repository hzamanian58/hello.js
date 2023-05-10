const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const config = require('config')

const Schema = new mongoose.Schema({
    name : {type: String, required: true},
    phone: {type: String, unique: true, minlength: 11, maxlength: 11},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    active: {type: Boolean, default: false}
});

Schema.methods.generateAuthToken = function(){
    const data = {
        _id: this._id,
        name: this.name,
        role: this.role,
    };
    return jwt.sign(data, config.get("jwtPrivateKey"))
}
const UserModel = mongoose.model('User', Schema);

module.exports = UserModel;