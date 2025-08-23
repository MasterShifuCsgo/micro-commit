import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const SessionContext = createContext();
export const SessionProvider = ({ children }) => {

  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");  

  async function sendRefreshToken(){

    const res = await fetch(`http://localhost:3000/jwt/refresh`, {
      method: "GET",
      credentials: "include"
    })
    
    let data = null;
    try{data = await res.json()}
    catch(e){console.log(e)};
    
    if(!res.ok){throw new Error(data.error)}

    setAccessToken(data.accessToken);    
    console.log("saved accessToken from refresh endpoint");
    console.log(data);
  }

  function navigateTo(place){
    navigate(place);
  }

  const value = {
    accessToken, 
    setAccessToken,
    sendRefreshToken,
    navigateTo
  };

  return <SessionContext.Provider value={value}>{ children }</SessionContext.Provider>

}

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if(!ctx){throw new Error("context provider does not reach this component")}
  return ctx;
}


