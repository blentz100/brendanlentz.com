import { styled } from "../lib/styles/stitches.config";
import BlogPostsList, { BlogPostsListProps } from "../components/BlogPostsList";
import { getPostsByYear } from "../lib/helpers/get-posts-by-year";

const H1 = styled("h1", {
  margin: "0 0 0.5em -1px", // misaligned left margin, super nitpicky
  fontSize: "1.8em",
  fontWeight: 500,
  lineHeight: 1.1,
  color: "$text",

  "@medium": {
    fontSize: "1.6em",
  },
});

const Paragraph = styled("p", {
  margin: "0.85em 0",
  lineHeight: 1.7,
  color: "$text",

  "&:last-of-type": {
    marginBottom: 0,
  },

  "@medium": {
    fontSize: "0.95em",
    lineHeight: 1.825,
  },
});

const BlogSection = styled("div", {
  marginTop: "3rem",
});

interface IndexProps {
  postsByYear: BlogPostsListProps["postsByYear"];
}

// Static Site Generation - NextJS pre-renders this page at
// build time using the props returned by getStaticProps.
const Index = ({ postsByYear }: IndexProps) => {
  return (
    <>
      <H1>Notes on software engineering</H1>

      <BlogSection>
        <BlogPostsList postsByYear={postsByYear}></BlogPostsList>
      </BlogSection>
    </>
  );
};

// NextJS calls getStaticProps at build time
export async function getStaticProps() {
  const postsByYear = await getPostsByYear();

  return {
    props: {
      postsByYear,
    },
    revalidate: 5,
  };
}

export default Index;
