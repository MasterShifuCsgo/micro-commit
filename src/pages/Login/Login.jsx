import { useEffect, useState } from "react";
import { verifyUser } from "../functions/verifyUser";
import { useSession } from "../../contexts/Session";
import Form from "../components/Form";

export default function Login(){

  const ctx = useSession();
  
  useEffect(() => {
    async () => {
      const res = await verifyUser(ctx);
      if(res){ctx.navigateTo("/")}
    }
  }, [ctx]);

    const data = {
      title: "Login",
      href: "register",
       //TODO: add setError method
      handleSubmit: async (form) => {        
        
        const res = await fetch(`http://localhost:3000/jwt/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });

        let data = null;
        try{data = await res.json()}
        catch(e){console.log("error occured creating json:", e)}

        if(!res.ok){console.log("error occured with response: ", data.error)
          return;
        };

        ctx.setAccessToken(data.accessToken);
        ctx.navigateTo('/');
      }
    }

  return(
    <Form data={data}/>
  );

}
