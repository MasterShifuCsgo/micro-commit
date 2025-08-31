import { useEffect, useState } from "react";
import { useSession } from "../../contexts/Session";
import styles from "./MainPage.module.css";
import Button from "./components/Button";
import NoCommits from "./components/NoCommits";

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

export default function MainPage() {
  const ctx = useSession();
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [commits, setCommits] = useState([]); // keep array for future list

  useEffect(() => {    
    (async () => {

      const token = ctx.accessToken;

      if (!token) {             
        try{
          await ctx.sendRefreshToken()      
        }catch(e){
          ctx.navigateTo("/login");          
        }
        return; //return early. rerender
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
    console.log("Add goal");
  }

  async function handleGoalButton(clickedGoal) {         

    //fetch specific goal from server and set contents
    let data = await fetch(`http://localhost:3000/goal/load/${clickedGoal.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ctx.accessToken}`
      }
    })
    
    //sometimes await data.json() does not throw an error, but server response is fucked, so must use try to if statement for that.
    let goal = null;
    try{
      goal = await data.json()
      setSelectedGoal(goal);
    }catch(e){console.log(e)};
    if(goal == null){console.log("BAD JSON. Try logging in again."); return;};        

    //fetch all commits to display them.
    data = await fetch(`http://localhost:3000/commit/getall/${goal.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${ctx.accessToken}`
      }
    })

    let commits = null;
    try{
      commits = await data.json()      
      setCommits(commits);
    }catch(e){console.log(e)};
    if(commits == null){console.log("BAD JSON. try logging in again"); return;};    

  }

  return (    
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Button className={styles.add_goal} onClick={handleAddGoal}>Add Goal</Button>
            <ul className={styles.goalList}>
              {goals.map(goal => (
                <li key={goal.id}>
                  <Button
                    style={styles.goal_button}
                    onClick={() => handleGoalButton(goal)}
                  >
                    {goal.name}
                  </Button>
                </li>
              ))}
            </ul>
      </aside>
      
      
      <main className={styles.content}>
        {/* About Goal*/ }
        <div className={styles.about_goal}>
          {selectedGoal ? (
            <>
              <p>{selectedGoal['name'] == null ?
               "Nothing" : selectedGoal['name']}</p>
              <p>Date: {selectedGoal['date_created'] == null ?
               "no data" : selectedGoal['date_created']}</p>
              <p>latest_commit: {selectedGoal['latest_commit'] == null ?
               "no data" : selectedGoal['latest_commit']}</p>
            </>
          ) : (
            <p>Goal not selected</p>
          )}          
        </div>
      
        {/* Commits */}
        {commits.length == 0 ? <NoCommits/> :
            <div className={styles.commits}>           
               {commits.map((commit) => (
                 <div key={commit.id} className={styles.commit}>
                    <div>
                      <h1>{commit.name}</h1>
                      <p>{(commit.date_created?.slice(0, 10) || "null") + "..."}</p>
                    </div>                    
                    <img
                     className={styles.commit_btn}
                     src="/play-button.svg"
                     alt="play button"
                    />
                 </div>
               ))}
            </div>}
      </main>
    </div>
  );
}
