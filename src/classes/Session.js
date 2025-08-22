import { createContext } from "react";

class Session {
  constructor(){
    this.accessToken = "";
  }

  //checking if Refresh Token exists is impossible since it's a http-only cookie

  saveAccessToken(token){
    this.accessToken = token;
  }

  SendRefreshToken(){    

    fetch("http://localhost:3000/refresh", {
      method: "GET",
      credentials: "include" 
    })
    .then(data => data.json())
    .then(json => {
      //save tokens
      this.accessToken = json.accessToken;      
      console.log("Tokens Saved!")
    })
  }

  sendPayloadToken(url, payload){
    if(this.accessToken == ""){throw new Error("Failed to send access token to server")}

    fetch(url, {
      method: "POST",
      headers:{
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json"
      },
      body: payload
    })
    .this(data => data.json)
    .this(json => console.log(json));
  }  
}

export default SessionContext = createContext({ Session });








