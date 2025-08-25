import { Router } from "express";
import MakeEdit from "./goal/edit.js"
import MakeAdd from "./goal/add.js"
import MakeDelete from "./goal/delete.js"
import MakeGetAllGoals from "./goal/getallgoals.js"
import MakeLoad from "./goal/load.js"

export function MakeGoalsRoute(db){
  const router = Router();
  router.post("/edit", MakeEdit(db));
  router.post("/add", MakeAdd(db));
  router.post("/delete", MakeDelete(db));
  router.post("/load", MakeLoad(db));
  router.get("/getall", MakeGetAllGoals());
  return router;
}