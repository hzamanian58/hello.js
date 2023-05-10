const express = require('express');
const _ = require("lodash");
const bcrypt = require('bcrypt');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('config');
const UserModel = require('../../models/UserModel');
const {
    loginValidator,
    registorValidator,
} = require('../validators/UserValidators');
const AuthUser = require('../middleware/AuthUser');
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '3441727271345A6859454354324C3346656D39736B4F515A32494852636457356D6E7239756E6C416E47513D'
});
const NodeCache = require("node-cache");
const { last } = require('lodash');
const myCache = new NodeCache({ stdTTL: 2 * 60 * 60, checkperiod: 5 * 60 });



class UserController {
    async userRegister(req, res) {
        const { error } = registorValidator(req.body);
        if (error) return res.status(400).send({ message: error.message });

        let user = await UserModel.findOne({ phone: req.body.phone });
        if (user) return res.status(400).send({ message: "این کاربر قبلا ثبت نام کرده است" })

        user = new UserModel(_.pick(req.body, ["name", "phone", "password", "role"]));

        // hash pasword with bcrypt library and their methods
        // generate salt with round number (for example: 10)
        const salt = await bcrypt.genSalt(10);
        // create hass password with use salt
        const hashPass = await bcrypt.hash(req.body.password, salt);
        user.password = hashPass;
        user = await user.save();

        // to generate token
        const data = {
            _id: user._id,
            name: user.name,
            role: user.role,
        };
        // .sign(payload, privateKey)
        const token = jwt.sign(data, config.get("jwtPrivateKey"));
        res.header('x-auth-token', token).send(_.pick(user, ["name", "phone", "_id"]));

    }

    async userLogin(req, res) {
        const { error } = loginValidator(req.body);
        if (error) return res.status(404).send({ message: error.message });

        let user = await UserModel.findOne({ phone: req.body.phone });
        if (!user) return res.status(404).send({ message: "کاربری با این نام کاربری یا رمز عبور یافت نشد" });

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(404).send({ message: "کاربری با این نام کاربری یا رمز عبور یافت نشد" });

        const data = {
            _id: user._id,
            name: user.name,
            role: user.role,
        };
        // .sign(payload, privateKey)
        const token = jwt.sign(data, config.get("jwtPrivateKey"));
        res.header('x-auth-token', token).send({ success: true });

    }

    async sendCode(req, res) {
        const id = req.user._id;
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("این کاربر در سیستم وجود ندارد");

        // send SMS
        const number = Math.floor((Math.random() * 90000) + 10000);
        myCache.set(req.user._id, number);
        api.Send({
            message: `لطفا برای فعالسازی از کد  ${number} استفاده کنید`,
            sender: "10008663",
            receptor: "09202006580" //user.phone,
        },
            function (response, status) {
                console.log(response);
                console.log(status);
                res.status(status).send(response)
            });
        // res.send(true);

    }

    async verifyCode(req, res) {

        if (!req.body.code) return res.status(400).send("باید یک کد ارسال کنید");

        const code = req.body.code;
        const lastCode = myCache.get(req.user._id);
        console.log(code, lastCode);
        if (code == lastCode) {
            const user = await UserModel.findById(req.user._id);
            user.active = true;
            await user.save();
            res.status(200).send(true);
        }
        else res.status(400).send(false);
    }
}

module.exports = UserController;