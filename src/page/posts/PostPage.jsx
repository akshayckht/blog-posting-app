import { BlogCard } from "../../components/blog/BlogCard";
import { AppLayout } from "../../components/layout/AppLayout";
import { Grid } from "@mui/material";
import { mockPosts } from "../../data/mockData";

export const PostPage = () => {

  const handleReadMore = (post) => {
    console.log("Selected post:", post);
  };

  return (
    <AppLayout>
      <Grid container spacing={3}>
        {mockPosts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <BlogCard post={post} onReadMore={handleReadMore} />
          </Grid>
        ))}
      </Grid>
    </AppLayout>
  );
};
