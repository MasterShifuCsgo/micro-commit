import { useEffect, useState } from "react";
import { useSession } from "../../contexts/Session";
import styles from "./MainPage.module.css";
import Button from "./components/Button";

async function fetchAllGoals(accessToken) {
  const res = await fetch("http://localhost:3000/goal/getall", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Failed to get goals: ${res.status} ${res.statusText}`);

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

      if (!ctx.accessToken) {             
        try{
          await ctx.sendRefreshToken()      
        }catch(e){
          ctx.navigateTo("/login");
          return;
        }         
      }

      try {
        const list = await fetchAllGoals(ctx.accessToken);
        setGoals(list);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [ctx.accessToken, ctx.navigateTo]); // stable deps only

  function handleAddGoal() {
    console.log("Add goal");
  }

  function handleGoalButton(goal) {
    setSelectedGoal(goal);    
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Button className={styles.add_goal} onClick={handleAddGoal}>Add Goal</Button>
            <ul className={styles.goalList}>
              {goals.map(goal => (
                <li key={goal.id}>
                  <Button
                    className={styles.goal_button}
                    onClick={() => handleGoalButton(goal)}
                  >
                    {goal.name}
                  </Button>
                </li>
              ))}
            </ul>
      </aside>

      <main className={styles.content}>
        <div className={styles.about_goal}>
          <div>{selectedGoal ? selectedGoal.name : "No goal selected"}</div>
          <div>Data</div>
        </div>

        <div className={styles.commits}>
          commits
        </div>
      </main>
    </div>
  );
}
