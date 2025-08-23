import {Routes, Route} from "react-router-dom";
import MainGoalPage from "./pages/MainGoalPage/MainGoalPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { SessionProvider } from "./classes/Session.jsx";
import './App.css';



function App() {

  return (    
    <SessionProvider>
      <Routes>
          <Route path="/" element={<MainGoalPage/>}/>   
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>    
      </Routes>          
    </SessionProvider>
  )
}

export default App;
