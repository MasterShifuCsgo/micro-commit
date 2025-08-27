import db from "../init.js";

export function DoesUserExist(email, username){
  return db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
    AND username = ?`)
    .get(email, username) != undefined; // true when found
}