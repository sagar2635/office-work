var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.listen(port);

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sagar26akbari35@gmail.com',
        pass: 'uetgbxdtqcyxudnc'
    }
});
app.get("/", function (req, res) {
    
})
app.get('/', function (req, res) {
    console.log('sending email..');
    const message = {
        from: 'sagar26akbari35@gmail.com', // Sender address
        to: 'sagar_akbari@yahoo.com',         // recipients
        subject: 'test mail from Nodejs', // Subject line
        text: 'Successfully! received mail using nodejs' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            console.log(info);
            console.log('success')
        }
    });
});