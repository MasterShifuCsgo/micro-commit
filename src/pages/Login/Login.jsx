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
      handleSubmit: (form) => {
  
      }
    }

  return(
    <Form data={data}/>
  );

}
