const jwt = require('jsonwebtoken');

const data = {
    name: "hamid",
    role: "admin",
    _id : "ojwk23560234pjwtgsa8d7agg"
};
const token = jwt.sign(data, "mywebtokenjwt");
console.log(token);
