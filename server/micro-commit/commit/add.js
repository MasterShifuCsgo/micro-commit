import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";
import createCommit from "../../database/functions/commit/createCommit.js";

export default function MakeAddCommit(db){
  return async function Add(req, res){

    let user = null;
    try{
      user = resolveUser(req);
    }catch(e){return res.status(401).send(createErrorMessage(e))};

    //check if body has necessary fields                    
    if(!checkResBody(req.body, ['goal_id', 'commit_name'])){
    return res.status(401).send(createErrorMessage("invalid body for request, missing ['goal_id', 'commit_name']"))};
      
    const { goal_id, commit_name } = req.body;

    try{
      const status = createCommit(goal_id, user.id, commit_name);
      if(!status){res.status(501).send(createErrorMessage("Failed to create commit"))}
    }catch(e){res.send(501).send(e)} //function also checks if goal_id and user_id match.

    res.status(201).send({success: "created commit"});
  }
}
