import getToday from "../../../micro-commit/global/getToday.js"
import db from "../../init.js"

export default function createCommit(goal_id, user_id, commit_name){

  // Check if user owns goal based on goal_id. 
  // To be sure that malicious users cannot edit other user's commits
  const result = db.prepare("SELECT * FROM goals WHERE id = ? AND account_id = ? LIMIT 1")
  .get(goal_id, user_id);

  if(result == undefined){throw new Error("user does not own goal with specified goal_id")};

  const today = getToday();
  return db.prepare("INSERT INTO commits (goal_id, name, date_created, commit_message) VALUES (?,?,?,?)")
  .run(goal_id, commit_name, today, null).changes > 0; // if changes were made returns true.
}