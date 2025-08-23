import { signAccess, signRefresh } from "../jwt.js"
import { sendAuthEmail } from "../../global/sendAuthEmail.js";
import verifyUser from "../functions/verifyUser.js";

export default function MakeRegister(db){
  return async function register(req, res){            
    const {username, email} = req.body;
    
    //if(!sendAuthEmail()){res.status(401).send("user failed to auth")}            

    try{
      verifyUser(username, email);
    }catch(err){    
      return res.status(401).send(err);
    }

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
      sameSite: "none",
      path: "/refresh"
    })

    res.status(201).send({
     accessToken: accessToken,     
    })
  }
}