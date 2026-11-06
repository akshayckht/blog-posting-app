import { Routes, Route } from "react-router";
import { Login } from "./page/auth/Login";
import { SignUp } from "./page/auth/SignUp";
import { PostPage } from "./page/posts/PostPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="posts" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
