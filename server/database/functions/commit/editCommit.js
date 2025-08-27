import db from "../../init.js"

export default function editCommit(user_id, commit_id, commit_message, commit_name){
      
  //get goal id which commit is to be changed
  const commit = db.prepare("SELECT * from commits WHERE id=? LIMIT 1").get(commit_id);
  if(commit == undefined){throw "user wants to edit commit that doesn't exist"}
  const { goal_id } = commit;

  //check if user owns the goal tied to the commit
  const goal = db.prepare("SELECT * FROM goals WHERE id = ? AND account_id = ? LIMIT 1").get(goal_id, user_id);  
  if(goal == undefined){throw "user does not own goal with specified goal_id"};
  //goal exists and is owned by user.

  const result = db.prepare("UPDATE commits SET name = ? and commit_message = ? WHERE id = ?")
  .run(commit_name, commit_message, commit_id);
  return result.changes > 0;
}


