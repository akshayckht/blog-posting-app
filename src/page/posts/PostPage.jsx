import { BlogCard } from "../../components/blog/BlogCard";
import { AppLayout } from "../../components/layout/AppLayout";
import { Grid } from "@mui/material";
// import { mockPosts } from "../../data/mockData";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { useNavigate } from "react-router";

export const PostPage = () => {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
 

  useEffect(() => {

   getAllPosts().then(
      (result) =>  setPosts(result)
    ).catch(
      (error) => console.error(error)
    )

  },[])

  console.log(posts)

  const handleReadMore = (post) => {
    console.log(post)
    navigate(`/posts/${post.id}`);

  };

  return (
    <AppLayout>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <BlogCard post={post} onReadMore={handleReadMore} />
          </Grid>
        ))}
      </Grid>
    </AppLayout>
  );
};
