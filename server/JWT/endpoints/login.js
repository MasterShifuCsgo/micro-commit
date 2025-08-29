import { createErrorMessage } from "../../global/createErrorMessage.js";
import isInputDangerous from "../functions/isInputDangerous.js"
import { DoesUserExist } from "../../database/functions/doesUserExist.js";
import { signAccess, signRefresh } from "../jwt.js";

//takes bearer token
export default function MakeLogin(db){
  return async function login(req, res){        
    const { username, email } = req.body;

    try{
      if(isInputDangerous({username, email})){
        throw new createErrorMessage("Invalid Fields");
      }
    
      if(!DoesUserExist(email, username)){
        throw new createErrorMessage("User does not exist");
      }

    }catch(err){
      return res.status(401).send(err);
    }

    //TODO: send authEmail

    //search for user on database for id.
    const info = db.prepare("SELECT * from users WHERE email = ?").get(email);    

    const accessToken = signAccess({
      id: info.id,
      username: username,
      email: email
    })

    const refreshToken = signRefresh({
      id: info.id,
      username: username,
      email:email
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //TODO: CHANGE THIS IN PRODUCTION. your site should be only on https not http
      sameSite: "lax",
      path: "/"
    })

    res.status(200).send({accessToken: accessToken});
  }
}