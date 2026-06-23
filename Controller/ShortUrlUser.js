const UrlUsersSchema = require('../Model/UrlUserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//signup controller
// username ,password 
// hash the password when storing in the db 
// create the username and password 


const registeruser = async (req, res) => {

    try {


        const { Username, Password } = req.body;
        if (!Username || !Password) {
            return res.status(400).json({
                status: "Failed",
                message: "Username password missing "
            })
        }

        const user = await UrlUsersSchema.findOne({ Username });

        if (user) {
            return res.status(400).json({
                status: "Failed",
                message: "Username already exists"
            })
        }

        const Hashpassword = await bcrypt.hash(Password, 10);
        const newuser = await UrlUsersSchema.create({
            Username,
            Password: Hashpassword



        })

        res.status(201).json({
            status: "Success",
            User: newuser.Username,
            Date: newuser.createdAt


        })





    } catch (err) {

        res.status(400).json({
            status: "Failed",
            error: err.message
        })

    }
}


// Take the username and password 
//Find the username 
//if exist ->check the db password with bcrypt
//return true
const loginUser = async (req, res) => {

    try {

        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({
                status: "Failed",
                message: "Username or Password is missing "

            })
        }

        const user = await UrlUsersSchema.findOne({ Username });
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "user does not exists "
            })
        }
        const match = await bcrypt.compare(Password, user.Password);

        if (match) {
            //login

            const token = jwt.sign({
                id: user._id,
                username: user.Username

            },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
                }

            )

            res.status(200).json({
                status: "Success",
                message: "Login successful",
                token: token
            })
        } else {
            res.status(400).json({
                message: "Invalid username or password "
            })
        }






    }
    catch (err) {
        console.log(err);


    }
}

module.exports = { registeruser, loginUser }