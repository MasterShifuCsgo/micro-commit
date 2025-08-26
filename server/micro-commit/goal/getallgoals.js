import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";

export default function MakeGetAllGoals(db){
  return async function GetAllGoals(req, res){    
    
    let user = null;
    try{
    user = resolveUser(req);
    }catch(e){return res.status(401).send(createErrorMessage(e))}    

    if(user == null){return res.status(401).send(createErrorMessage("access token expired or invalid"))}

    //get all goals from user    
    const goals = db.prepare("SELECT * from goals WHERE account_id=?").all(user.id);    

    //send json
    res.status(200).send({goals: goals})
  }
}