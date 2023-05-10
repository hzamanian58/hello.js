// const express = require('express');
const mongoose = require('mongoose');
// const AuthAdmin = require('../http/middleware/AuthAdmin');
// const AuthUser = require('../http/middleware/AuthUser');
// const router = express.Router();
const Customer = require('../../models/CustomerModel');
const {
    customerValidate,
    updateCustomerValidate,
} = require('../validators/CustomerValidators');


class CustomerController {

    async getMe(req, res) {
        res.send(req.user);
    }

    async customerList(req, res) {
        const customerList = await Customer.find();
        res.send(customerList);
    }

    async getCustomerById(req, res) {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(401).send("bad Id");
        const customer = await Customer.findById(req.params.id);
        if (customer) res.send(customer);
        else res.status(404).send("not found");
    }

    async newCustomer(req, res) {
        // input validation
        const { error } = customerValidate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        let customer = new Customer({
            name: req.body.name,
        });
        customer = await customer.save()
        res.send(customer);
    }

    async editCustomer(req, res) {
        // input validation
        const { error } = await updateCustomerValidate({
            ...req.body,
            customerId: req.params.customerId,
        })
        if (error)
            return res.status(400).send({ message: error.message });
        let customer = await Customer.findById(req.params.customerId);
        if (!customer)
            return res.status(404).send({ message: 'مشتری مورد نظر یافت نشد' });
        customer.name = req.body.name;
        customer = await customer.save()
        res.send(customer);
    }


    async deleteCustomer(req, res) {
        await Customer.findByIdAndRemove(req.params.customerId);
        res.status(200).send("deleted");

    }
}

module.exports = CustomerController;


// router.get("/api/me", AuthUser, async(req, res)=>{
//   res.send(req.user);
// })




// // use AuthUser middleware
// router.get('/api/customers', AuthUser, async (req, res) => {
//   const customerList = await Customer.find();
//   res.send(customerList);
// });

// //use Athuser and AuthAdmin middlewares
// router.get('/api/customers/:id', [AuthUser, AuthAdmin], async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id))
//     return res.status(401).send("bad Id");
//   const customer = await Customer.findById(req.params.id);
//   if (customer) res.send(customer);
//   else res.status(404).send("not found");
// });

// router.post('/api/customers', async function (req, res) {
//     // input validation
//     const { error } = customerValidate(req.body);
//     if (error) return res.status(400).send({ message: error.message });

//     let customer = new Customer({
//         name: req.body.name,
//     });
//     customer = await customer.save()
//     res.send(customer);

// });

// router.put('/api/customers/:customerId', async (req, res) => {
//     // input validation
//     const { error } = await updateCustomerValidate({
//         ...req.body,
//         customerId: req.params.customerId,
//     })
//     if (error)
//         return res.status(400).send({ message: error.message });
//     let customer = await Customer.findById(req.params.customerId);
//     if (!customer)
//         return res.status(404).send({ message: 'مشتری مورد نظر یافت نشد' });
//     customer.name = req.body.name;
//     customer = await customer.save()
//     res.send(customer);
// });

// router.delete('/api/customers/:customerId', async (req, res) => {
//     await Customer.findByIdAndRemove(req.params.customerId);
//     res.status(200).send("deleted");
// });

// module.exports = router;