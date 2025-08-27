import getToday from "../../../micro-commit/global/getToday.js";
import db from "../../init.js";

export default function createGoal(id, goal_name){  
  const today = getToday();
  const result = db.prepare(`INSERT INTO goals (account_id, name, date_created, latest_commit)
              VALUES (?, ?, ?, ?)`).run(id, goal_name, today, null);
  return result.changes > 0;
}