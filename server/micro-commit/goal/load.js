import getGoal from "../../database/functions/goal/getGoal.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";

export default function MakeLoadGoal(db){
  return async function Load(req, res){

    if(!checkResBody(req.body, ['goal_id'])){
    return res.status(401).send(
      createErrorMessage("invalid body for request, missing ['goal_id']")
    )};  

    let user = null;
    try{
      user = resolveUser(req); 
    }catch(err){return res.status(401).send(err)}

    if(user == null){
        return res.status(401).send(createErrorMessage("access token expired or invalid"))
    };

    const { goal_id } = req.body;

    const goal = getGoal(goal_id, user.id);
    if(goal == null){
      return res.status(401).send(createErrorMessage("requested goal does not exist"))
    };

    res.status(200).send(goal);
  }
}