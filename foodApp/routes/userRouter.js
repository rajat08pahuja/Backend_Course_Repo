const express = require('express');
const userModel = require('../models/userModel');
const userRouter = express.Router();
const protectRoute = require('./authHelper').protectRoute;

userRouter
    .route('/')
    .get(protectRoute, getUsers)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)


async function getUsers(req, res) {
    try {
        console.log('getUsers called');
        let users = await userModel.find();
        if (users) {
            return res.json(users);
        } else {
            return res.json({
                message: "users not found"
            });
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

function createUser(req, res) {
    user = req.body;
    res.send("data has been added successfully");
}

// app.patch('/user', updateUser);

function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.json(user);
}

// app.delete('/user', deleteUser)

function deleteUser(req, res) {
    user = {};
    res.json(user);
}

// param routes
// app.get('/user/:id', getUserById);

function getUserById(req, res) {
    console.log(req.params);
    res.send(req.params);
}

module.exports = userRouter;