import { DoesUserExist } from "../../database/functions/DoesUserExist.js";
import { createErrorMessage } from "../../global/errorMessage.js";
import isInputDangerous from "./isInputDangerous.js";

//cleans and compares original user input - e.g. is user sql injecting
//searches for user on database - see if user exists
export default function verifyUser(username, email){  

  if(isInputDangerous({username, email})){
    throw new createErrorMessage("Invalid Fields");
  }

  if(DoesUserExist(email)){
    throw new createErrorMessage("User already exists");
  }
  
}