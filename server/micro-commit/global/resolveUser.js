import isInputDangerous from "../../JWT/functions/isInputDangerous.js";
import { verifyAccess } from "../../JWT/jwt.js";


//used to check if token is valid. returns the data inside token if true.
export default function resolveUser(req){
  //decode accessToken    
    const token = req.headers['authorization'].split(" ")[1];    
    const user = verifyAccess(token);
    if(user == null){throw "invalid access token"}          
    if(isInputDangerous(user)){throw "Invalid access token fields"}  // cleans just incase access token key is in the hands of a bad person.  
    //! if request does not reach here, then there has been a breach. access token was stolen.    

    return user;
}
