const nodeMailer = require('nodemailer');
const { nodemailer_gmail_password, nodemailer_gmail_account, sendTo } = require('./secretKey');

async function sendMail(userObj) {
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: nodemailer_gmail_account,
            pass: nodemailer_gmail_password
        }
    })

    let sub = `Thank you for Signing ${userObj.name}`
    let tex = `
       Hope you have a good time !
       Here are your details-
       Name - ${userObj.name}
       Email- ${userObj.email}
       `
    let htm = `<h1>Welcome to foodApp.com</h1>`

    let info = transporter.sendMail({
        from: `"Food App " <${nodemailer_gmail_account}>`,
        to: `${sendTo}`,
        subject: sub,
        text: tex,
        html: htm
    })

    console.log(info.messageId);
}

module.exports = sendMail;