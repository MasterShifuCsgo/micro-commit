import { useEffect, useState } from "react";
import { useSession } from "../../contexts/Session";
import styles from "./MainPage.module.css";
import Button from "./components/Button";
import Commits from "./components/commits/Commits";
import AboutGoal from "./components/AboutGoal/AboutGoal";
import ModalForm from "./components/Modal/Modal";

async function fetchAllGoals(accessToken) {
  const res = await fetch("http://localhost:3000/goal/getall", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const data = await res.json().catch(() => { throw new Error("Bad JSON"); });
  return data;
}

async function fetchGoal(accessToken, goal_id){
    return await fetch(`http://localhost:3000/goal/load/${goal_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${accessToken}`
    }})
}

async function fetchCommits(accessToken, goal_id){
  return await fetch(`http://localhost:3000/commit/getall/${goal_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`
      }
    })
}

export default function MainPage() {
  const ctx = useSession();
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [commits, setCommits] = useState([]); // keep array for future list  
  const [ modalStatus, setModalStatus ] = useState(false); //is modal displayed or not.  


  useEffect(() => {    
    (async () => {

      const token = ctx.accessToken;

      if (!token) {             
        try{
          await ctx.sendRefreshToken()      
        }catch(e){
          ctx.navigateTo("/login");          
        }
        return; // return early. rerender
      }

      try {        
        const list = await fetchAllGoals(token);
        setGoals(list);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [ctx.accessToken]);

  function handleAddGoal() {
    //show modal and its from            
    setModalStatus(true);
  }

  async function handleGoalButton(clickedGoal) {         
    
    //if accessToken is expired, retry useEffect.
    if(!ctx.accessToken){ 
      SetRefreshPage(v => !v); 
      return;
    }
        
    //fetch specific goal from server and set contents
    let goal = null;    
    try{      
      const data = await fetchGoal(ctx.accessToken, clickedGoal.id);
      goal = await data.json();         
      setSelectedGoal(goal);
    }catch(e){console.log(e)};
    if(goal == null){console.log("fetched goals returned null. Try refreshing the page."); return;};

    //fetch all commits to display them.
    let commits = null;
    try{      
      const data = await fetchCommits(ctx.accessToken, clickedGoal.id);      
      commits = await data.json();
      setCommits(commits); // set commits for displaying
    }catch(e){console.log(e)};
    if(commits == null){console.log("fetched commits returned null. Try refreshing the page."); return;};    

  }

  async function handleSubmit(fields){      
    const goal_name = fields['Goal name'];

    const data = await fetch("http://localhost:3000/goal/add", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${ctx.accessToken}`
    },
    body: JSON.stringify({goal_name: goal_name})
    })
    
    console.log(await data.json())

    //create POST request to save the data.

  }

  return (    
    <>
    <div className={styles.container}>      
      <aside className={styles.sidebar}>
        <button 
        className={styles.add_goal} 
        onClick={() => handleAddGoal()}>Add Goal</button>
          <ul className={styles.goalList}>
            {goals.map(goal => (
              <li key={goal.id}>
                <button
                  className={styles.goal_button}
                  onClick={() => handleGoalButton(goal)}
                >
                  {goal.name}
                </button>
              </li>
            ))}
          </ul>
      </aside>
      <main className={styles.content}>
        <AboutGoal goal={selectedGoal}/>
        <Commits commits={commits}/> 
      </main>
    </div>
    <ModalForm
     on={modalStatus}     
     inputs={["Goal name"]}
     handleSubmit={(fields) => handleSubmit(fields)}
     onClose={() => {setModalStatus(false);}}/>
    </>
  );
}
