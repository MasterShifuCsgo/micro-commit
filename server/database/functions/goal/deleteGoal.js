import db from "../../init.js";


/**
 * Deletes a goal from the database.
 *
 * The goal is deleted only if both `goal_id` and `user_id` match,
 * ensuring that users can delete only their own goals.
 *
 * @param {number} goal_id - The ID of the goal to delete.
 * @param {number} user_id - The ID of the user who owns the goal.
 * @returns {boolean} True if the goal was deleted, false otherwise.
*/
export default function deleteGoal(goal_id, user_id) {
  const result = db
    .prepare("DELETE FROM goals WHERE id = ? AND account_id = ?")
    .run(goal_id, user_id);
  return result.changes > 0;
}


