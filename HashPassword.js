const bcrypt = require('bcrypt');

async function generateSalt(){

    const salt = await bcrypt.genSalt(10);
    const pass = "123456"
    const hashPass = await bcrypt.hash(pass, salt)
    console.log(salt);
    console.log(hashPass);
}
generateSalt();