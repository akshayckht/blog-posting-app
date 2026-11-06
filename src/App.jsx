import { Routes, Route } from "react-router";
import { Login } from "./page/auth/Login";
import { SignUp } from "./page/auth/SignUp";
import { PostPage } from "./page/posts/PostPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { MyBlogsPage } from "./page/posts/MyblogPage";
import { CreatePostPage } from "./page/posts/CreatePostPage";
import { EditPostPage } from "./page/posts/EditPostPage";
import { PostDetailsPage } from "./page/posts/PostDetailsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="posts" element={<PostPage />} >
          
        </Route>
        <Route path="posts/:postId" element={<PostDetailsPage/>}></Route>
        <Route path="my-blogs" element={<MyBlogsPage />} />
        <Route path="posts/new" element={<CreatePostPage />} />
        <Route path="posts/:postId/edit" element={<EditPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
