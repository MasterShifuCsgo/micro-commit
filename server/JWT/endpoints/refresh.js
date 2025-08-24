import { createErrorMessage } from "../../global/errorMessage.js";
import { signAccess, signRefresh ,verifyRefresh } from "../jwt.js";
import isInputDangerous from "../functions/isInputDangerous.js"
import { DoesUserExist } from "../../database/functions/DoesUserExist.js";
import { createFrefreshTokenCookie } from "../functions/createRefreshTokenCookie.js"

export default function MakeRefresh(){
  return async function refresh(req, res){          
    
    const token = req.cookies.refreshToken;
    const valid = verifyRefresh(token);        

    if(valid == null){
      return res.status(401).send(createErrorMessage("Refresh token is not valid"))
    }

    const {id, username, email} = valid;

    try{
      
      if(isInputDangerous({ username, email })){
        throw new createErrorMessage("Invalid Fields");
      }
    
      if(!DoesUserExist(email)){
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
    
    createFrefreshTokenCookie(res, refreshToken);
    
    res.status(200).send({ accessToken: accessToken });
  }
}