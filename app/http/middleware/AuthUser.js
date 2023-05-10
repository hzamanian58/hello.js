const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function (req, res, next){
    // send token from front by key-value x-auth-token to backend
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("شما اجازه دسترسی به این بخش را ندارید")
try{

    // decode token by jwt
    // verify method(token , secret private key)
    const user = jwt.verify(token,  config.get("jwtPrivateKey"))
    //  Add to user request
    req.user = user;
    next()
}catch(ex){
    return res.status(401).send("شما اجازه دسترسی به این بخش را ندارید")
}
};