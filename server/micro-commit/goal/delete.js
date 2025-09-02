import checkResBody from "../global/checkResBody.js";
import resolveUser from "../global/resolveUser.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";
import deleteGoal from "../../database/functions/goal/DeleteGoal.js";

export default function MakeDeleteGoal(){
  return async function Delete(req, res){

    if(!checkResBody(req.body, ['goal_id']))
      {return res.status(401).send(createErrorMessage("invalid body for request, missing 'goal_id'"))};    

    let user = null;
    try{
      user = resolveUser(req); 
    }catch(err){return res.status(401).send(err)}

    if(user == null){return res.status(401).send(createErrorMessage("access token expired or invalid"))}

    const { goal_id } = req.body;

    const result = deleteGoal(goal_id, user.id);    
    if(!result){return res.status(501).send(createErrorMessage("Failed to delete goal. goal probably doesnt exist."))};

    res.status(200).send({success: "delete goal"});
  }
}