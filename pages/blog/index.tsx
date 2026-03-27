import { NextSeo } from "next-seo";
import Content from "../../components/Content";
import BlogPostsList, { BlogPostsListProps } from "../../components/BlogPostsList";
import { getPostsByYear } from "../../lib/helpers/get-posts-by-year";
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
  const postsByYear = await getPostsByYear();

  return {
    props: {
      postsByYear,
    },
  };
};

export default Blog;
