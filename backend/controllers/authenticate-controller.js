var db = require('../routes/conn');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var fs = require('fs');
var Hogan = require('hogan.js')
const bcrypt = require('bcryptjs');
var smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();
const path = require('path');

const accessTokenSecret = process.env.SECRET;
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const BCRYPT_SALT_ROUNDS = 12

//Controller responsible for authentication 
module.exports.authenticate = function(req,res) {

    //Login form information
    var email = req.body.email;
    var password = req.body.password;

    //Database query to authenticate user
    db.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields){
        if(error) {
            console.log(error)
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        } else {

            //Check if the email exists
            if(results.length > 0) {
                    
                //Check if the password is correct
                bcrypt.compare(password, results[0].password, function (err, response) {

                    if (err) {

                        console.log("Erro: ", err)

                    } else {
   
                        
                        if ( response == false) {
                            
                            console.log("bcrypt falsa")
                            //Email exists, but password is incorrect
                            //Keep message below for security reasons by not indicating what the error was
                            res.json({
                                status:false,
                                message: "Email and password does not match"
                            });
                            res.status(400)
                        } else {

                            console.log("bcrypt verdadeira")
                            //Generate token that expires in 60m (modify as needed)
                            const token = jwt.sign({ email }, accessTokenSecret, { expiresIn: '6000m' });

                            //Insert token in cookies
                            res.cookie('token', token, {httpOnly: true});

                            res.json({
                                token,
                                status:true,
                                message: 'Successfully authenticate'
                            })
                        } 
                    }
                })
            //})            
            } else {
                
                //If the email does not exist already returns an error
                res.json({
                    status:false,
                    message: "Please enter valid information."
                });
                res.status(400)
            }
        }
    });
}

//Controller responsible for reset password 
module.exports.forgotpassword = function(req,res) {

    //Reset form information
    var email = req.body.email;

    //Email
    console.log('forgot password email: ', email)
    
    //Empty email field
    if (email === '') {
        res.status(400).send("email required")
    }

    //Database query to check user
    db.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields){

        //username = results[0].nickname
        password = results[0].password

        //Query error
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        //If query is correct
        } else {

            //Check if the email exists
            if(results.length > 0) {

                //Generate token that expires in 60m (modify as needed)
                //const token = jwt.sign({ email }, accessTokenSecret, { expiresIn: '60m' });
                const token = crypto.randomBytes(20).toString('hex')
                console.log("token: ", token)
                
                //token time //
                //resetPasswordTokenExpires = Date.now() + 360000

                //Update user reset token //
                let data = [token, results[0].email ];
                //
                db.query('UPDATE user SET resetPasswordToken = ? WHERE email = ?', data, function(error, results, fields){
                    if(error) {
                        console.log('There are some error with query', error)
                    } else {
                        console.log('resetPasswordToken registered sucessfully')
                    }
                });

                //Nodemailer
                //The account sending the password reset email link
                //dotenv: to read the contents of the file and insert the email address and password for Nodemailer’s createTransport function to pick up.
                const transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail', 
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: `${process.env.USER_MAIL}`,
                        pass: `${process.env.USER_PASS}`
                    }
                }))
                
                const options = {
                    viewEngine: {
                      partialsDir: "./views/partials",
                      layoutsDir: "./views/layouts",
                      extname: ".handlebars"
                    },
                    extName: ".handlebars",
                    viewPath: "views"
                  };

                  
                transporter.use('compile', hbs(options));

                //Email content
                const mailOptions = {
                    from: 'feralmail2021@gmail.com',
                    to: `${email}`, 
                    subject: 'FeralCharts - Reset Password',
                    template: 'reset',
                    context: {
                        passwordResetAddress: `http://localhost:5000/reset/${token}`
                    }
                }

                //Email sent
                console.log('Sending email...');

                //Transporter
                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log('Send Mail Error: ', err);
                    } else {
                        console.log('Response: ', response);
                        res.json({
                            message: 'Recovery email sent'
                        });
                        res.status(200)
                    }
                })

            } else {                
                //If the email does not exist already returns an error
                res.json({
                    message: "Email does not exists"
                });
                res.status(400)
            }
        }
    });
}

//Controller responsible for reset password 
module.exports.resetpassword = function(req, res, next) {

    console.log("Reset Password Function")

    const token = req.params
    const password = req.body.password

    console.log("reset token: ", token)
    console.log("new password: ", password)

    //Database query to check user
    db.query('SELECT * FROM user WHERE resetPasswordToken = ?', [token.resetPasswordToken], function (error, results, fields){

        email = results[0].email
        console.log("user email: ", email)

        //Query error
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        //If query is correct
        } else {
            
            //resetPasswordTokenExpires //
            //resetPasswordTokenExpires = results[0].resetPasswordTokenExpires

            //Check if the email exists
            //if(results.length > 0) {

            if(results.length > 0) {

                res.json({
                    email: email,
                    message: 'password reset link working'
                })
                
            } else {
                console.log('password reset link is invalid or has expired')
                res.json('password reset link is invalid or has expired')
            }

        }

    })
 
}

//Controller responsible for update password 
module.exports.updatepassword = function(req, res, next) {

    console.log("Update Password Function")

    email = req.body.email
    console.log("email: ", email)

    //Database query to check user
    db.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields){

        email = results[0].email
        console.log("user email: ", email)

        //Query error
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
        //If query is correct
        } else {

            
            //Check if the email exists
            if(results.length > 0) {

                console.log("User exists")
                bcrypt
                    .hash(req.body.password, BCRYPT_SALT_ROUNDS)
                    .then(hashedPassword => {

                        //Update user reset token
                        
                        password = hashedPassword
                        resetPasswordToken = null
                        //resetPasswordTokenExpires = null

                        let data = [password, resetPasswordToken, email];
                            db.query('UPDATE user SET password = ?, resetPasswordToken = ? WHERE email = ?', data, function(error, results, fields){
                            if(error) {
                                console.log('There are some error with query', error)
                            } else {
                                console.log('password updated sucessfully')
                            }
                        });
                    })
                    .then(() => {
                        console.log("Password updated")
                        res.json({
                            message: 'Password updated'
                        })
                        res.status(200)
                    })
            } else {  

                console.log("No users exists in DB to update")
                res.json({
                    message: 'No users exists in DB to update'
                })
                res.status(404)
            }
        }

    })
}
