import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { SessionProvider } from "./contexts/Session.jsx";
import './App.css';



function App() {
  return (    
    <SessionProvider>
      <Routes>
          <Route path="/" element={<MainPage/>}/>   
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>    
      </Routes>
    </SessionProvider>
  )
}

export default App;
