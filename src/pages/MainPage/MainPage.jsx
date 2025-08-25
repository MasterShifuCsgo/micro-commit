import { useEffect, useState } from "react";
import { useSession } from "../../contexts/Session";


async function fetchAllGoals(accessToken){

  const res = await fetch("http://localhost:3000/getallgoals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",      
      "Authorization": `Bearer ${accessToken}`
    }
  })

  if(!res.ok){throw new Error("Error: Failed getting all goals")}

  let data = null;
  try{data = await res.json()}
  catch(e){throw new Error("Error: failed to create json from response")}

  return data;
}

export default function MainPage(){

  const ctx = useSession();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async () => {
      if(ctx.accessToken == ""){ctx.navigateTo("/login")}

      try {
        const goals = await fetchAllGoals(ctx.accessToken);
        setGoals(goals)
      }catch(err){
        console.log("Error: ", err); // replace with showing a toast
      }

    }
  }, [ctx])

  return(
    <>

    </>
  );

}
