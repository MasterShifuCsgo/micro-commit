import loadCommit from "../../database/functions/commit/loadCommit.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";
import resolveUser from "../global/resolveUser.js";
import checkResBody from "../global/checkResBody.js";

export default function MakeLoadCommit(){
  return async function Load(req, res){

    let user = null;
    try{
      user = resolveUser(req);
    }catch(e){res.status(401).send(createErrorMessage(e))};    

    if(!checkResBody(req.body, ['commit_id']))
      {return res.status(401).send(createErrorMessage("invalid body for request, missing 'commit_id'"))}; 

    const { commit_id } = req.body;

    try{
    const commit = loadCommit(commit_id, user.id);
    if(commit == undefined){return res.status(501).send(createErrorMessage("commit does not exist"))}
    return res.status(200).send(commit);
    }catch(e){return res.status(501).send(createErrorMessage(e))};    
  }
}