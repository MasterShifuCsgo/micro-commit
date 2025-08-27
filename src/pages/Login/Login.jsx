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
      handleSubmit: async (form) => {        
        
        const res = await fetch(`http://localhost:3000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });

        let data = null;
        try{data = await res.json()}
        catch(e){throw new Error("error: json not created. check server response")}

        if(!res.ok){throw new Error(data.error)};

        ctx.setAccessToken(data.accessToken);
        ctx.navigateTo('/');
        return "login successful";
      }
    }

  return(
    <Form data={data}/>
  );

}
