const mongoose = require("mongoose")

const Schema = new mongoose.Schema({name : String});

const CustomerModel = mongoose.model('customer', Schema);

module.exports = CustomerModel;