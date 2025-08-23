import { useEffect } from "react";
import { useSession } from "../../classes/Session.jsx";


export default function Login(){
  
  const ctx = useSession();
  
  useEffect(() => {
    console.log(ctx.checkAccessToken());
  }, []);

  return (
    <>Login</>
  );
}



