const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const sendMail = require('../nodeMailer');
const JWT_KEY = require('../secretKey').JWT_KEY;
const jwt = require('jsonwebtoken');

authRouter
    .route('/signup')
    .post(setCreatedAt, signUpUser)

authRouter
    .route('/forgetPassword')
    .get(getForgetPassword)
    .post(postForgetPassword, validateEmail)

authRouter
    .route('/login')
    .post(loginUser)


function setCreatedAt(req, res, next) {
    let obj = req.body;
    let length = Object.keys(obj).length;
    if (length == 0) {
        return res.status(400).json({
            message: "cannot create user if req.body is empty"
        })
    }
    req.body.createdAt = new Date();
    next();
}

async function signUpUser(req, res) {
    try {
        let userObj = req.body;
        let user = await userModel.create(userObj);
        console.log('user', user);
        sendMail(userObj);
        res.json({
            message: 'user signed up successfully',
            user: userObj
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            message: err.message
        })
    }
}

function getForgetPassword(req, res) {
    res.sendFile('public/forgetPassword.html', { root: __dirname });
}

function postForgetPassword(req, res, next) {
    console.log(req.body.email);
    // res.send("Request Submitted Successfully");
    next();
}

function validateEmail(req, res) {
    console.log("in validate email function");
    console.log(req.body);

    res.json({
        message: "data received",
        data: req.body
    })
}

async function loginUser(req, res) {
    try {
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                if (req.body.password == user.password) {
                    let payload = user['_id'];
                    let token = jwt.sign({ id: payload }, JWT_KEY);
                    console.log('token', token);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: "User Logged In Successfully"
                    });
                } else {
                    return res.json({
                        message: "email or password is wrong"
                    });
                }
            } else {
                return res.json({
                    message: "email or password is wrong"
                })
            }
        } else {
            return res.json({
                message: "user is not present"
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = authRouter;