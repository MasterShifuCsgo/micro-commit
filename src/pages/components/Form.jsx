import style from "./Form.module.css"
import { useState } from "react";

export default function Form({ data }){

  const [fields, setFields] = useState({username: "", email: ""});

  function handleChange(e){
    const {placeholder, value} = e.target;
    setFields(v => ({...v, [placeholder]: value}))
  }


  return (
    <div className={style.container}>
      <div className={style.inner_container}>
        <h1>{data.title}</h1>
        <form onSubmit={(e) => {e.preventDefault(); data.handleSubmit(e)}} className={style.form}>
          <div className={style.inputs}>
            <input className={style.input}
            type="text" placeholder="username" value={fields.username} onChange={(e) => handleChange(e)}/>
            <input className={style.input}
            type="text" placeholder="email" value={fields.email} onChange={(e) => handleChange(e)}/>
          </div>
          <p>Go to <a href={"/" + data.href}>{data.href}</a></p>
          <button className={style.submit_btn}>{data.title}</button>
        </form>
      </div>
    </div>   
  );

}