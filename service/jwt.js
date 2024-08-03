const crypto = require('crypto')
const { sign, verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = crypto.randomBytes(11).toString('hex')



const createToken = (user)=>{
    const accessToken = sign({
        email:user.email,
        name:user.name,
        password:user.password
    },secret)
    return accessToken

}


const validateToken =(req,res,next)=>{
    const vAccessToken = req.cookies.jwt;
    if(!vAccessToken){
        return res.status(401).json({error:'user is not authenitcated'})
    }


    try{
        const validToken = verify(vAccessToken,secret);
        if (validToken) req.authenticated = true;
        return next();
    }catch(error){
        return res.status(400).jsom({error:error})
    }
}

module.exports = {createToken, validateToken}
