import { NextSeo } from "next-seo";
import Content from "../../components/Content";
import BlogPostsList, { BlogPostsListProps } from "../../components/BlogPostsList";
import { getAllPosts } from "../../lib/helpers/parse-posts";
import type { GetStaticProps } from "next";

const Blog = ({ postsByYear }: BlogPostsListProps) => {
  return (
    <>
      <NextSeo
        title="Blog"
        description="Recent blog posts by Brendan Lentz."
        openGraph={{
          title: "Blog",
        }}
      />

      <Content>
        <BlogPostsList postsByYear={postsByYear} />
      </Content>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // parse the year of each post and group them together
  const posts = await getAllPosts();
  const postsByYear: BlogPostsListProps["postsByYear"] = {};

  posts.forEach((post) => {
    const year = new Date(post.date).getUTCFullYear();
    (postsByYear[year] || (postsByYear[year] = [])).push(post);
  });

  return {
    props: {
      postsByYear,
    },
  };
};

export default Blog;
