import db from "../../init.js";

export default function getGoal(goal_name, user_id){  
  return db.prepare(`
    SELECT * 
    FROM goals
    WHERE name = ?
    AND account_id = ?
    LIMIT 1`)
  .get(goal_name, user_id);
}