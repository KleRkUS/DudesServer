import {Dudes} from "../../core/Dudes.d/dudes";
import { Request } from 'express';

const jwt = require("jsonwebtoken");

const generateAccessToken = ({username, roles, expiration, temporary = false}:Dudes.TokenGeneratingParams) => {
  const expirationDays:number = expiration / 1000 / 60 / 60 / 24;
  return jwt.sign({username, roles, temporary}, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: `${expirationDays} days` });
}

const generateRefreshToken = ({username, roles, expiration, temporary = false}:Dudes.TokenGeneratingParams) => {
  const expirationDays:number = expiration / 1000 / 60 / 60 / 24;
  return jwt.sign({username, roles, temporary}, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS256", expiresIn: `${expirationDays} days` });
}

const verifyToken = (req:Request, cb:Function) => {
  if (!req.body.access_token){
    cb({status: !1, code: 400});
  }

  let payload
  try{
    payload = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_SECRET);
    cb({status: !0})
  }
  catch(e){
    //if an error occured return request unauthorized error
    cb({status: !1, code: 403});
  }
}

const decode = (req:Request) => {
  if (!req.body.access_token){
    return {status: !1, code: 400};
  }

  try {
    const payload = jwt.decode(req.body.access_token);
    return payload;
  } catch (e) {
    return {status: !1, code: 500}
  }
}

export {generateRefreshToken, generateAccessToken};