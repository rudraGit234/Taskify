import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import bcrypt from "bcrypt" // for bashing the password 
import jwt from "jsonwebtoken"

//@desc register a user 
//@route post /api/users/register    
//@access public 
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    console.log(username, email, password);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory")
    }


    // checking if the email is aready in data base or not
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered")
    }

    //Hashing the password since we can't just use raw password give by client 
    //Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`hashed password: ${hashedPassword}`);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data is not valid ")
    }

    res.json({ message: "Register the user" })
})


//@desc Login user 
//@route post /api/users/login
//@access public 

// whenever user logs in they get a web token after giving email and password match
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    // comparing the password in database with input client password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            //payload embedding in token 
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "25m" }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
})


//@desc current  user  info
//@route post /api/users/current 
//@access private
export const currentUser = asyncHandler(async (req, res) => {

    res.json(req.user)
})
