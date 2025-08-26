import getGoal from "../../database/functions/goal/getGoal.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";


export default function MakeLoad(db){
  return async function Load(res, req){

    if(!checkResBody(req.body, ['goal_id'])){
    return res.status(401).send(
      createErrorMessage("invalid body for request, missing ['goal_id', 'goal_name']")
    )};  

    let user = null;
    try{
      user = resolveUser(req); 
    }catch(err){return res.status(401).send(err)}

    if(user == null){
        return res.status(401).send(createErrorMessage("access token expired or invalid"))
    };

    const { goal_id } = res.body;

    const goal = getGoal(goal_id, user.id);
    if(goal == null){
      return res.status(501).send(createErrorMessage("requested goal does not exist"))
    };

    res.status(200).send(goal);
  }
}