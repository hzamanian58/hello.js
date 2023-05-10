const express = require('express');
const mongoose  = require('mongoose');
const AuthAdmin = require('../http/middleware/AuthAdmin');
const AuthUser = require('../http/middleware/AuthUser');
const router = express.Router();
const Customer = require('../models/CustomerModel');
const {
  customerValidate,
  updateCustomerValidate,
} = require('../http/validators/CustomerValidators');

const CustomerController = require("../http/controller/CustomerController");
const customerController = new CustomerController();

router.get("/api/me", AuthUser, customerController.getMe)
// use AuthUser middleware
router.get('/api/customers', AuthUser, customerController.customerList);

//use Athuser and AuthAdmin middlewares
router.get('/api/customers/:id', [AuthUser, AuthAdmin], customerController.getCustomerById);

router.post('/api/customers', customerController.newCustomer);



router.put('/api/customers/:customerId', customerController.editCustomer);

router.delete('/api/customers/:customerId', customerController.deleteCustomer);

module.exports = router;