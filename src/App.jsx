import { Routes, Route } from "react-router";
import { Login } from "./page/auth/Login";
import { SignUp } from "./page/auth/SignUp";
import { PostPage } from "./page/posts/PostPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<SignUp/>}/>
      <Route path="posts" element={<PostPage/>}/>
    </Routes>
  );
}

export default App;
