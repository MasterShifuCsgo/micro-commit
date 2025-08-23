import { Router } from "express";
import MakeLogin from "./endpoints/Login.js";
import MakeRefresh from "./endpoints/refresh.js";
import MakeRegister from "./endpoints/register.js";

export default function MakeJWTRoute(db){  
  const router = Router();
  router.post("/login", MakeLogin(db));
  router.post("/register", MakeRegister(db));
  router.get("/refresh", MakeRefresh(db));
  return router;
}

