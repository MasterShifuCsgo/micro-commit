import styles from "./Commits.module.css";
import NoCommits from "./NoCommits";

export default function Commits({ commits }){


  return (
    <>
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
    </>
  );


}