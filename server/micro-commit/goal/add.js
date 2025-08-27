import getGoal from "../../database/functions/goal/getGoal.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";
import createGoal from "../../database/functions/goal/createGoal.js";

export default function MakeAddGoal(){
  return async function Add(req, res){

    //check if body has necessary fields                    
    if(!checkResBody(req.body, ['goal_name'])){
    return res.status(401).send(createErrorMessage("invalid body for request, missing 'goal_name'"))};

    //get user
    let user = null;
    try{
      user = resolveUser(req); 
    }catch(err){return res.status(401).send(err)}
    
    if(user == null){return res.status(401).send(createErrorMessage("access token expired or invalid"))}

    const { goal_name } = req.body;

    const goal = getGoal(goal_name, user.id);
    if(goal != null){
      return res.status(401).send(createErrorMessage("Goal with similar name already exists"));
    };
    
    const result = createGoal(user.id, goal_name);
    if(!result){return res.status(501).send(createErrorMessage("Goal was not created"));}
    
    res.sendStatus(201);
  }
}
