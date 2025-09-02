import styles from "./NoCommits.module.css";

export default function NoCommits(){

  return(
    <div className={styles.container}>
      <h1>Didn't find any commits :(</h1>
      <ol>
        <li>Goal is not selected</li>
        <li>You haven't added any commits.</li>        
        <li>Website is slightly broken.</li>
        <li>There is a problem with the server. ( Probably not )</li>
      </ol>
    </div>
  );
}