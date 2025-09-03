import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";
import editCommit from "../../database/functions/commit/editCommit.js";

export default function MakeEditCommit(){
  return async function Edit(req, res){

    let user = null;
    try{
      user = resolveUser(req);
    }catch(e){return res.status(401).send(createErrorMessage(e))};

    //check if body has necessary fields                    
    if(!checkResBody(req.body, ['commit_id', 'commit_message', 'commit_name'])){
    return res.status(401).send(createErrorMessage("invalid body for request, missing ['commit_id', 'commit_message']"))};

    const { commit_id, commit_message, commit_name } = req.body;    

    try{
      const status = editCommit(user.id, commit_id, commit_message, commit_name);
      if(!status){return res.status(501).send(createErrorMessage("failed to edit commit"))}
    }catch(e){return res.status(501).send(createErrorMessage(e))} //function also checks if goal_id and user_id match.

     res.status(200).send({success: "edited commit"});
  }
}