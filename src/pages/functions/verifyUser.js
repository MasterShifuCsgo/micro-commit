import { useSession } from "../../contexts/Session.jsx";


//used in login and register page load to understand where can user be redirected to.
export async function verifyUser(ctx){  

  //check if access token exists
  if(ctx.accessToken != ""){
    return true;
  }

  //send refreshToken
  try{
    await ctx.sendRefreshToken();
    return true;
  }catch(err){
    console.log("verifyUser failed:", err);
    return false;
  }

  //invalid user
}










