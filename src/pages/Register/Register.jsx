import { useSession } from "../../contexts/Session";
import { useState, useEffect } from "react";
import { verifyUser } from "../functions/verifyUser";
import Form from "../components/Form";

export default function Register(){

  
  const ctx = useSession();
  
  useEffect(() => {
    async () => {
      const res = await verifyUser(ctx);
      if(res){ctx.navigateTo("/")}
    }
  }, [ctx]);

    const data = {
      title: "Register",
      href: "login",
      handleSubmit: (form) => {
        
      }
    }

  return(
    <Form data={data}/>
  );

}
