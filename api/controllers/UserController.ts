import {MongoError} from "graphql-compose-mongoose";
import { Request, Response } from 'express';
import {Dudes} from "../../core/Dudes.d/dudes";

const verifyer = require("../utils/Verifyer");

const User = require('../models/UserModel');
const TempUser = require('../models/TempUserModel');
const crypto = require('crypto')
// const {verifyToken, decode} = require('../utils/Token');

interface User {
    id?:string,
    name:string,
    password:string,
    email:string,
    roles?:Array<string>,
    groups?:Array<string>
}

interface TempUser {
    id?:string,
    name:string,
    password:string,
    email:string,
    confirmationToken:string
}

const generateConfirmationLink = (context:string):string => {
    const shasum = crypto.createHash("sha1");
    shasum.update(context);
    return `https://localhost:5000/confirm-reg/${shasum.digest('hex')}`;
}

exports.createTempUserDocument = (req:Request, res:Response):void => {
    const tempUser:any = new TempUser(),
          body:User = req.body;

    if (!body.name || body.password || body.email) {
        res.status(400).json({message: "Required fields not found!"});
    } else if (!verifyer.isEmailValid(body.email)) {
        res.status(400).json({message: "Email is invalid!"});
    }

    tempUser.name = body.name;
    tempUser.password = body.password;
    tempUser.email = body.email;
    tempUser.roles = body.roles ? body.roles : ["DEFAULT"];
    if (body.groups) tempUser.groups.push(body.groups);

    const link:string = generateConfirmationLink(body.email);

    tempUser.save(async (err:MongoError, user:User) => {
        if (err) res.status(500).json({message: "Error when saving new user! Could not save user", Error: err});

        const mailReg:Dudes.MailStatus = await mailer.sendRegistrationConfirmationEmail({
            username: body.name,
            email: body.email,
            link: link
        });

        if (!mailReg.status) res.status(500).json({message: `Unable to send confirmation email!`, details: mailReg.context});

        res.status(200).json({
            message: "Temporary user created! Please, confirm your E-mail.",
        })
    });
}

//
//
// exports.index = function (req, res) {
//   User.get(function (err, users) {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     }
//     res.json({
//       status: "success",
//       message: "Contacts retrieved successfully",
//       data: users
//     });
//   });
// };
//
// // Handle create contact actions
// exports.new = function (req, res) {
//   const user = new User();
//   user.name = req.body.name ? req.body.name : user.name;
//   user.password = req.body.password;
//
//   // save the contact and check for errors
//   user.save(function (err) {
//     res.json({
//       message: 'New user created!',
//       data: user
//     });
//   });
// };
//
// exports.all = (req, res) => {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   User.find({}, {
//     name: 1
//   }, (err, data) => {
//     if (err) res.send(err);
//
//     res.json({
//       message: "All users",
//       data: data
//     })
//   });
// }
//
// exports.getByName = async name => {
//   return User.find({name: name}, (err, user) => {
//     if (err) {
//       return false;
//     }
//     return user;
//   });
//
// }
//
// exports.view = function (req, res) {
//   User.findById(req.params.user_id, function (err, contact) {
//     if (err)
//       res.send(err);
//     res.json({
//       message: 'Contact details loading..',
//       data: contact
//     });
//   });
// };
//
// // Handle update contact info
// exports.update = function (req, res) {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   const decoded = decode(req);
//
//   if (!decoded) res.status(500).send();
//
//   User.findOne({name: decoded.token}, function (err, user) {
//     if (err) res.status(400).send(err);
//     user.password = req.body.password;
//     // save the contact and check for errors
//
//     user.save(function (err) {
//       if (err) res.status(500).json(err);
//       res.status(200).json({
//         message: 'User info updated',
//         data: user
//       });
//     });
//   });
// };
// // Handle delete contact
// exports.delete = function (req, res) {
//   User.remove({
//     _id: req.params.user_id
//   }, function (err, user) {
//     if (err)
//       res.send(err);
//     res.json({
//       status: "success",
//       message: 'Contact deleted'
//     });
//   });
// };
//
// exports.setToken = (name, token) => {
//   User.findOne({name: name}, (err, user) => {
//     user.token = token;
//
//     user.save(err => {
//       return !err;
//     });
//   });
// }
//
// exports.checkPass = (req, res) => {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   const decoded = decode(req);
//   console.log(decoded);
//
//   User.findOne({name: decoded.token}, (err, user) => {
//     if (err) {res.status(500).send(`Error: ${err}`); return;}
//
//
//     if (req.body.password === user.password) {
//       res.status(200).json({message: "Ok"});
//     } else {
//       res.status(400).send("Bad password");
//     }
//   })
// }