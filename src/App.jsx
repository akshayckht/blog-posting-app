import { Routes, Route } from "react-router";
import { Login } from "./page/auth/Login";
import { SignUp } from "./page/auth/SignUp";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
