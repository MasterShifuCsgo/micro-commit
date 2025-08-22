import { createErrorMessage } from "../../global/errorMessage.js";
import verifyUser from "../functions/verifyUser.js";
import { verifyAccess } from "../jwt.js";

//takes bearer token
export default function MakeLogin(db){
  return async function login(req, res){    
    const auth = req.headers['authorization']; 
    const token = verifyAccess(auth.split(" ")[1]); 

    if(token == null){return res.status(401).send(createErrorMessage("Access Token Invalid"))}

    try{
      verifyUser(token.username, token.email);
    }catch(err){
      return res.status(401).send(err.message);
    }

    res.status(200).send({message: "your good to redirect"})
  }
}