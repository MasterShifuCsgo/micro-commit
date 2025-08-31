import { Router } from "express";
import MakeEditGoal from "./goal/edit.js"
import MakeAddGoal from "./goal/add.js"
import MakeDeleteGoal from "./goal/delete.js"
import MakeGetAllGoals from "./goal/getallgoals.js"
import MakeLoadGoal from "./goal/load.js"
import MakeEditCommit from "./commit/edit.js";
import MakeAddCommit from "./commit/add.js";
import MakeDeleteCommit from "./commit/delete.js";
import MakeLoadCommit from "./commit/load.js";
import MakeGetAllCommits from "./commit/getallcommits.js";

export function MakeGoalsRoute(db){
  const router = Router();
  router.post("/add", MakeAddGoal(db));
  router.put("/edit", MakeEditGoal(db));
  router.delete("/delete", MakeDeleteGoal(db));
  router.get("/load/:goal_id", MakeLoadGoal(db));
  router.get("/getall", MakeGetAllGoals(db));
  return router;
}

export function MakeCommitsRoute(db){
  const router = Router();
  router.post("/add", MakeAddCommit(db));
  router.put("/edit", MakeEditCommit(db));
  router.delete("/delete", MakeDeleteCommit(db));
  router.get("/load/:commit_id", MakeLoadCommit(db));
  router.get("/getall/:goal_id", MakeGetAllCommits(db));
  return router;
}
