import db from "../../init.js";


//need to provide goal_id and user_id to confirm user is changing their own goal.
export default function editGoalName(goal_id, user_id, new_name){
  const result = db
  .prepare("UPDATE goals SET name = ? WHERE id = ? AND account_id = ?")
  .run(new_name, goal_id, user_id);
  return result.changes > 0;
}