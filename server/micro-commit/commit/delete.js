import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";
import deleteCommit from "../../database/functions/commit/deleteCommit.js";

export default function MakeDeleteCommit(){
  return async function Delete(){
    let user = null;
    try{
      user = resolveUser(req);
    }catch(e){res.status(401).send(createErrorMessage(e))};

    //check if body has necessary fields
    if(!checkResBody(req.body, ["commit_id"])){
    return res.status(401).send(createErrorMessage("invalid body for request, missing ['commit_id']"))};
      
    const { commit_id } = req.body;

    try{
      const status = deleteCommit(goal_id, user.id, commit_id);
      if(!status){res.status(501).send(createErrorMessage("Failed to delete commit. probably doesn't exist"))}
    }catch(e){res.send(501).send(e)} //function also checks if goal_id and user_id match.

    res.sendStatus(200);
  }
}