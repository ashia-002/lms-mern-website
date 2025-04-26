const User = require("../models/User.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) => {
    const {userName, userEmail, password, role} = req.body;

    const existingUser = await  User.findOne({
        $or: [{userEmail}, {userName}],
    });

    if(existingUser){
        return res.status(400).json(
            {
                success : false,
                message : 'User name or User email already exists'
            }
        )
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({userName, userEmail, role, password: hashPassword})

    await newUser.save();

    return res.status(201).json(
        {
            success: true,
            message: 'User registration successful!'
        }
    )
}

const loginUser = async(req, res) => {
    const {userEmail, password} = req.body;
    console.log("Login request received:", userEmail, password); // Debugging step

    const checkUser = await User.findOne({userEmail});

    if(!checkUser || !(await bcrypt.compare(password, checkUser.password))){
        return res.status(401).json(
            {
                success: false,
                message: 'Invalid credentials',
            }
        )
    }
//?Generating the token
    const accessToken = jwt.sign(
       {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role
       }, "JWT_SECRET", {expiresIn: '120m'}
    )

    console.log("Login successful for:", userEmail); // Debugging step
    res.status(200).json(
        {
            success: true,
            message: 'Login Successful',
            data: {
                accessToken,
                user: {
                    _id: checkUser._id,
                    userName: checkUser.userName,
                    userEmail: checkUser.userEmail,
                    role: checkUser.role
                },
            },
        }
    )
};



module.exports = {registerUser, loginUser};