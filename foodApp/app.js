const express = require('express');

// server creation
const app = express();
let port = '8080';

app.listen(port , function(){
    console.log(`server is listening on port ${port}`);
})

// types of requests -> get post put delete

app.get('/' , (req , res) => {
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log("Hello from Home Page")
    res.send(`<h1>Hello Hi from Backend</h1>`);
});

let obj = {
    name: "Rajat"
}

app.get('/user' , (req , res) => {
    console.log('users');
    res.json(obj);
});

app.get('/home' , (req , res) => {
    res.sendFile('./views/index.html' , {root:__dirname});
});