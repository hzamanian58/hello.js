const Joi = require('joi')
Joi.objectId = require('joi-objectId')(Joi);

const loginValidator = (data)=>{
  const schema = Joi.object({
    phone: Joi.string().required().min(11).max(11),
    password: Joi.string().required(),
  });
  return schema.validate(data)
};

const registorValidator = (data)=> {
  const schema = Joi.object({
    phone: Joi.string().required().min(11).max(11),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string(),
  });
  return schema.validate(data);
}

module.exports = {loginValidator, registorValidator }
























// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

// const customerValidate = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().min(2).max(10).required(),
//   });
//   return schema.validate(data);
// };
// const updateCustomerValidate = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().min(2).max(10).required(),
//     customerId: Joi.objectId().required(),
//   });
//   return schema.validate(data);
// };

// module.exports = { customerValidate, updateCustomerValidate };
