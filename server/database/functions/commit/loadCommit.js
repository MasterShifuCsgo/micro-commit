import db from "../../init.js";

export default function loadCommit(commit_id, user_id){

  console.log(commit_id, user_id)

  //get goal id which commit is to be changed
  const commit = db.prepare("SELECT * from commits WHERE id=? LIMIT 1").get(commit_id);
  if(commit == undefined){throw `commit with id=${commit_id} doesn't exist`}
  const { goal_id } = commit;

  console.log(goal_id);
  //check if user owns the goal tied to the commit
  const goal = db.prepare("SELECT * FROM goals WHERE id = ? AND account_id = ? LIMIT 1").get(goal_id, user_id);  
  if(goal == undefined){throw "user does not own goal with specified goal_id"};
  //goal exists and is owned by user.  

  return commit;
}