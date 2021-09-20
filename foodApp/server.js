const express = require('express');
const app = express();
// const Router = express.Router();

app.listen('5000', function () {
    console.log('server is listening on port 5000');
});

app.use(express.json());
app.use(express.static('public'));

const userRouter = express.Router();
const authRouter = express.Router();
const forgetPasswordRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/forgetPassword', forgetPasswordRouter);

userRouter
    .route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser)

// userRouter
//     .route('/:id')
//     .get(getUserById)

authRouter
    .route('/signup')
    .post(signUpUser)

forgetPasswordRouter
    .route('/')
    .get(getForgetPage)
    .post(postForgetPage, validateEmail)

function getForgetPage(req, res) {
    res.sendFile('public/forgetPassword.html', { root: __dirname });
}

function postForgetPage(req, res, next) {
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

let user = [];

function signUpUser(req, res) {
    let { email, name, password } = req.body;
    user.push({ email, name, password });
    console.log('user', req.body);
    res.json({
        message: 'user signed up successfully',
        user: req.body
    })
}

app.get('/', (req, res) => {
    res.send('Home Page');
});

// redirect
app.get('/user-all', (req, res) => {
    res.redirect('/user');
});

// 404 page not found
app.use((req, res) => {
    res.sendFile('public/404.html', { root: __dirname });
})

// app.get('/user', getUser);

function getUser(req, res) {
    res.json(user);
}

// app.post('/user', createUser);

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