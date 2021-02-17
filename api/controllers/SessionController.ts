// const User = require('./UserController');
import {generateAccessToken, generateRefreshToken} from "../utils/Token";

const Session = require("../models/SessionsModel");

import {Dudes} from "../../core/Dudes.d/dudes";
import {MongoError} from "graphql-compose-mongoose";

exports.createSession = async ({username, roles, expiration, userId, temporary = false}:Dudes.Session.SessionCreateParams):Promise<Dudes.Session.SessionResponse> => {
    const session:any = new Session();

    session.user_id = userId;
    session.expires_in = expiration;
    session.temporary = temporary;

    const refreshToken:string = generateRefreshToken({username, roles, expiration, temporary});
    const accessToken:string = generateAccessToken({username, roles, expiration, temporary});

    if (!refreshToken && !accessToken) return {status: false, code:501, details:{message: "Could not create tokens!", data: {accessToken, refreshToken}}};
    session.refresh_token = refreshToken;


    return await session.save((err:MongoError, session:any):Dudes.Session.SessionResponse => {
        if (err) {
            return {status: false, code: 500, details: {message: "Could not create session document!", data: err}};
        }
        return {status: true, code:200, details: {message: "Session successfully created!", data: {refreshToken, accessToken}}};
    });

}

// const cookieConfig = {
//   httpOnly: true,
//   maxAge: 2592000000
// };
//
// exports.login = async (req, res) => {
//   if (!req.body.name || !req.body.password) res.status(400).json({message: "Password or name doesn't set!"});
//
//   const username = req.body.name;
//   const user = await User.getByName(username);
//
//   if (user && user[0].password !== req.body.password) {
//     res.status(403).json({message: "Password doesn't match or user doesn't exist"});
//     return;
//   }
//
//   const refreshToken = Token.generateRefreshToken(username);
//   const accessToken = Token.generateAccessToken(username);
//
//   User.setToken(username, refreshToken);
//
//   res.cookie('JWT', accessToken, cookieConfig);
//   res.status(200).json({
//     message: "OK"
//   });
// }
//
// exports.check = (req, res) => {
//   Token.verifyToken(req, (data) => {
//     if (!data.status) {
//       res.status(403).send();
//       return;
//     }
//     res.status(200).json({message: "OK"});
//   });
// }
//
// exports.logout = (req, res) => {
//   Token.verifyToken(req, (data) => {
//     if (!data.status) res.status(403);
//     res.cookie('JWT', "", cookieConfig);
//     res.status(200).json({message: "OK"});
//   })
// }
//
