import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

// -- Sign for both token types --

export function signAccess(payload){
  return jwt.sign(payload, accessTokenSecret, {expiresIn: accessTokenExpiration});
}

export function signRefresh(payload){
  return jwt.sign(payload, refreshTokenSecret, {expiresIn: refreshTokenExpiration});
}


// -- Verify for both token types --

export function verifyAccess(token){
  try{
    return jwt.verify(token, accessTokenSecret)
  }catch(err){
    return null;
  }
}

export function verifyRefresh(token){
  try{
    return jwt.verify(token, refreshTokenSecret)
  }catch(err){
    return null;
  }
}

