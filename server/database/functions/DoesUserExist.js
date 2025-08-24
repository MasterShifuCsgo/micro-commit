import db from "../init.js";

export function DoesUserExist(email){
  const user = db.prepare("SELECT * from users WHERE email = ?").get(email);      
  return user != undefined;
}