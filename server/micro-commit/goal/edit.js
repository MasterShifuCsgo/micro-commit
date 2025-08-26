import checkResBody from "../global/checkResBody.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";


export default function MakeEdit(db){
  return async function Edit(req, res){
    
    if(!checkResBody(req.body, ['goal_id', 'goal_name']))
    {return res.status(401).send(createErrorMessage("invalid body for request, missing ['goal_id', 'goal_name']"))};    

    let user = null;
    try{
      user = resolveUser(req); 
    }catch(err){return res.status(401).send(err)}
    
    if(user == null){return res.status(401).send(createErrorMessage("access token expired or invalid"))}

    const { goal_name, goal_id } = res.body;

    const result = editGoalName(goal_id, user_id, goal_name);
    if(!result){return res.status(501).send(createErrorMessage("failed to edit goal name"))};

    res.sendStatus(200);
  }
}