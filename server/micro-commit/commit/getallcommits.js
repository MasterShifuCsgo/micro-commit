import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import getAllCommits from "../../database/functions/commit/getAllCommits.js";
import checkResBody from "../global/checkResBody.js";

export default function MakeGetAllCommits(){
  return async function getAll(req, res){
    let user = null;
    try{
      user = resolveUser(req);
    }catch(e){return res.status(401).send(createErrorMessage(e))};                                  

    if(!checkResBody(req.params, ['goal_id']))
      {return res.status(401).send(createErrorMessage("invalid body for request, missing 'goal_id'"))}; 

    const { goal_id } = req.params;
    
    try{
      const commits = getAllCommits(user.id, goal_id);      
      res.status(200).send(commits);
    }catch(e){return res.status(501).send(createErrorMessage(e))}
    
  }
}