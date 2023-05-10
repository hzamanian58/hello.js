const express = require('express');
// const _ = require("lodash");
// const bcrypt = require('bcrypt');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const UserModel = require('../models/UserModel');
// const {
//   loginValidator,
//   registorValidator,
// } = require('../http/validators/UserValidators');
const AuthUser = require('../http/middleware/AuthUser');
// var Kavenegar = require('kavenegar');
// var api = Kavenegar.KavenegarApi({
//     apikey: '3441727271345A6859454354324C3346656D39736B4F515A32494852636457356D6E7239756E6C416E47513D'
// });
// const NodeCache = require( "node-cache" );
// const { last } = require('lodash');
// const myCache = new NodeCache( { stdTTL: 2*60*60, checkperiod: 5*60 } );
const UserController = require("../http/controller/UserController")
const userController = new UserController();




router.post('/api/user/register', userController.userRegister);

router.post('/api/user/login', userController.userLogin);

// api for send SMS Code to user
router.get('/api/user/sendCode', AuthUser, userController.sendCode);

function async_error_middleware(func){
  return async function (req, res, next){
    try{
      await func(req, res)
    }catch(err){
      next(err);
    }
  }
}

// api for verify SMS Code from user
router.post('/api/user/verifyCode', AuthUser, userController.verifyCode);

module.exports = router;