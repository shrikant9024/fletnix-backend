const User = require("../models/user")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const { createToken } = require("../service/jwt");
const { error } = require("console");




async function handleSignup(req,res){
    try{
        const {email,name,password,age}=req.body
        
        //user exist
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send("User already exists")
    }
    const hashedPassword= await bcrypt.hash(password,10);

    const result = await User.create({
        email, name, password:hashedPassword,age
    })

    return res.status(201).json({msg:"user registration succesfull"})
    }catch(error){
        console.error("error while signing up",error)
        return res.status(500).json({ error: "Internal server error" });
        }

}


async function handleLogin(req,res){
    const {email,password} = req.body

        const loginUser = await User.findOne({email});
        if(!loginUser) res.status(400).send("User does not exist")

            const dbpassword = loginUser.password
            bcrypt.compare(password,dbpassword).then((match)=>{
                if(!match){
                    res.status(401).json({error:"wrong password"})
                }
            })
            const accessToken = createToken(User)
            res.cookie("jwt",accessToken,{
                expire: new Date(Date.now()+7*24*60*60*1000),
            })
      
            return res.status(200).json({msg:"user logged in succesfully"})
            }
          
        


module.exports = {handleLogin,handleSignup}