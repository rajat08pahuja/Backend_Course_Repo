const express = require('express');
const app = express();
// const Router = express.Router();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.listen('5000', function () {
    console.log('server is listening on port 5000');
});

app.use(express.json());
app.use(express.static('public'));

const forgetPasswordRouter = express.Router();

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//     res.send('Home Page');
// });

// // redirect
// app.get('/user-all', (req, res) => {
//     res.redirect('/user');
// });

// // 404 page not found
// app.use((req, res) => {
//     res.sendFile('public/404.html', { root: __dirname });
// })