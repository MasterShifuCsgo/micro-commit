import db from "../../init.js";

export default function getGoal(goal_id, user_id){  
  return db.prepare(`
    SELECT * 
    FROM goals
    WHERE id = ?
    AND account_id = ?
    LIMIT 1`)
  .get(goal_id, user_id);
}