import styles from "./Button.module.css"

export default function Button({ children, style }){
  return (<button className={style}>{ children }</button>);
}