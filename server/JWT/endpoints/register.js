import { signAccess, signRefresh } from "../jwt.js"
import isInputDangerous from "../functions/isInputDangerous.js"
import { DoesUserExist } from "../../database/functions/doesUserExist.js";
import { createErrorMessage } from "../../global/createErrorMessage.js";

export default function MakeRegister(db){
  return async function register(req, res){            
    const { username, email } = req.body;
    
    //TODO: if(!sendAuthEmail()){res.status(401).send("user failed to auth")}       

    try{
      
      if(isInputDangerous({username, email})){
        throw new createErrorMessage("Invalid Fields");
      }
    
      if(DoesUserExist(email, username)){
        throw new createErrorMessage("User already exists");
      }

    }catch(err){
      return res.status(401).send(err);
    }


    //TODO: send authEmail

    //create user
    const info = db.prepare("INSERT INTO users (username, email) VALUES (?, ?)").run(username, email);
    const id = info.lastInsertRowid;

    //create access and refresh tokens
    const accessToken = signAccess({
      id:id,
      username: username,
      email:email
    })

     const refreshToken = signRefresh({
      id:id,
      username: username,
      email:email
    })
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //TODO: CHANGE THIS IN PRODUCTION. your site should be only on https not http
      sameSite: "lax",
      path: "/"
    })

    res.status(201).send({accessToken: accessToken})
  }
}