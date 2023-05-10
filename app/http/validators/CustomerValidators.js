const Joi = require('joi')
Joi.objectId = require('joi-objectId')(Joi);

const customerValidate = (data)=>{
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50)
  });
  return schema.validate(data)
};

const updateCustomerValidate = (data)=> {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    customerId: Joi.objectId().required(),
  })
  return schema.validate(data);
}

module.exports = {customerValidate, updateCustomerValidate }
























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
