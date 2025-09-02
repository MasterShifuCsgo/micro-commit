import styles from "./AboutGoal.module.css";

export default function About_goal({ goal }){
  
  return (
    <div className={styles.about_goal}>
      {goal ? (
        <>
          <p>{goal['name'] == null ?
           "Nothing" : goal['name']}</p>
          <p>Date: {goal['date_created'] == null ?
           "no data" : goal['date_created']}</p>
          <p>latest_commit: {goal['latest_commit'] == null ?
           "no data" : goal['latest_commit']}</p>
        </>
      ) : (
        <p>Goal not selected</p>
      )}          
    </div>
  );
}