import db from "../../init.js";

export default function deleteCommit(goal_id, user_id, commit_id){

  const res = db.prepare("SELECT * FROM goals WHERE id = ? AND account_id = ? LIMIT 1")
    get(goal_id, user_id);

  if(res == undefined){throw new Error("user does not own goal with specified goal_id")};

  const result = db
    .prepare("DELETE FROM commits WHERE id = ? AND goal_id = ?")
    .run(commit_id, goal_id);
  return result.changes > 0;
  
}