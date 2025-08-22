import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainGoalPage from "./pages/MainGoalPage/MainGoalPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import './App.css';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<MainGoalPage/> />          
          <Route path="/" element=<Login/> />          
          <Route path="/" element=<Register/> />          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
