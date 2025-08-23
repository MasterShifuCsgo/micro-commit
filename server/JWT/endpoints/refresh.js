import { createErrorMessage } from "../../global/errorMessage.js";
import verifyUser from "../functions/verifyUser.js"
import { signAccess, signRefresh, verifyRefresh } from "../jwt.js";

export default function MakeRefresh(db){
  return async function refresh(req, res){
    
    const token = req.cookie.refreshToken;
    const valid = verifyRefresh(token);
    
    if(valid == null){
      return res.status(401).send(createErrorMessage("Refresh token is not valid"))}
      
    try{
      verifyUser(username, email);
    }catch(err){
      return res.status(401).send(err.message);
    }
    
    const accessToken = signAccess({
      id: user.user.id,
      username: user.user.username,
      email: user.user.email
    })    

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //TODO: CHANGE THIS IN PRODUCTION. your site should be only on https not http
      sameSite: "none",
      path: "/refresh"
    })

    res.status(200).send({ accessToken: accessToken });
  }
}