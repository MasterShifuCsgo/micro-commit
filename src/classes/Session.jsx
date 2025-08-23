import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const SessionContext = createContext();

export function SessionProvider({ children }){
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");

  const checkAccessToken = () => accessToken !== "";
  const saveAccessToken = (t) => setAccessToken(t);

  const sendRefreshToken = async () => {
    const res = await fetch("http://localhost:3000/refresh", {
      method: "GET",
      credentials: "include",
    });
    return { ok: res.ok, json: await res.json() };
  };

  const sendPayload = async (url, payload) => {
    if (!accessToken) throw new Error("Failed to send access token to server");

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return { ok: res.ok, json: await res.json() };
  };

  const sendTokens = async () => {
    let res = await sendPayload("http://localhost:3000/login");
    if (res.ok) return true;
    res = await sendRefreshToken();
    if (res.ok) return true;
    return false;
  };
  
  const navigateTo = (place) => navigate(place);

  const value = {
    accessToken,
    checkAccessToken,
    saveAccessToken,
    sendRefreshToken,
    sendPayload,
    sendTokens,
    navigateTo,
  };


  return (
    <SessionContext.Provider value={value}>{ children }</SessionContext.Provider>
  );

  }

export const useSession = () => {
  const c = useContext(SessionContext);
  if (!c) throw new Error("useSession must be used within <SessionProvider>");
  return c;
};



