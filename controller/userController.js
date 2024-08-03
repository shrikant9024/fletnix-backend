const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createToken } = require("../service/jwt");

const saltRounds = 10; 

// Handle user signup
async function handleSignup(req, res) {
    try {
        const { email, name, password, age } = req.body;

     
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

  
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword,
            age
        });

        return res.status(201).json({ msg: "User registration successful" });
    } catch (error) {
        console.error("Error while signing up:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//  user login
async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {

        const loginUser = await User.findOne({ email });
        if (!loginUser) {
            return res.status(400).send("User does not exist");
        }
        const match = await bcrypt.compare(password, loginUser.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong password" });
        }


        const accessToken = createToken({ id: loginUser._id });

        res.cookie("jwt", accessToken, {
            httpOnly: true, 
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
        });

        return res.status(200).json({ msg: "User logged in successfully" });
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { handleLogin, handleSignup };
