import db from "../../init.js";

export default function getAllCommits(user_id, goal_id){

  console.log(user_id, goal_id)

  //check if user actually owns the goal
  const goal = db.prepare("SELECT * FROM goals WHERE id = ? AND account_id = ?")
  .get(goal_id, user_id);

  if(goal == undefined){throw "user does not own goal with specified goal_id"};
  
  return db.prepare("Select * from commits where goal_id = ?").all(goal_id); //if nothing return empty array
}