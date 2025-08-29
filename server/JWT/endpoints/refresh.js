import { createErrorMessage } from "../../global/createErrorMessage.js";
import { signAccess, signRefresh ,verifyRefresh } from "../jwt.js";
import isInputDangerous from "../functions/isInputDangerous.js"
import { DoesUserExist } from "../../database/functions/doesUserExist.js";

export default function MakeRefresh(){
  return async function refresh(req, res){          
    
    const token = req.cookies.refreshToken;    

    console.log(req.cookies);

    const valid = verifyRefresh(token);        

    if(valid == null){
      return res.status(401).send(createErrorMessage("Refresh token is not valid"))
    }

    const {id, username, email} = valid;

    try{
      
      if(isInputDangerous({ username, email })){
        throw new createErrorMessage("Invalid Fields");
      }
    
      if(!DoesUserExist(email, username)){
        throw new createErrorMessage("User doesn't exist");
      }

    }catch(err){      
      return res.status(401).send(err);
    }
    
    const accessToken = signAccess({
      id: id,
      username: username,
      email: email
    })

    const refreshToken = signRefresh({
      id:id,
      username: username,
      email:email
    })
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //TODO: CHANGE THIS IN PRODUCTION. your site should be only on https not http
      sameSite: "lax",
      path: "/"
    })
    
    res.status(200).send({ accessToken: accessToken });
  }
}