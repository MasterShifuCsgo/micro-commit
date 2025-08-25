import { useSession } from "../../contexts/Session.jsx";


//used in login and register page load to understand where can user be redirected to.
export async function verifyUser(ctx){  

  //check if access token exists
  if(ctx.accessToken != ""){
    return true; //user already has an access token
  }

  //send refreshToken
  try{
    await ctx.sendRefreshToken();
    return true; //user had refresh token. now has access token
  }catch(err){
    console.log("verifyUser failed:", err);
    return false; // give opportunity to get access to an access token
  }

  //invalid user
}










