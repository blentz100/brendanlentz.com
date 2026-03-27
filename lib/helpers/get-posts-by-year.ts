import { getAllPosts } from "./parse-posts";
import { BlogPostsListProps } from "../../components/BlogPostsList";

export async function getPostsByYear(): Promise<BlogPostsListProps["postsByYear"]> {
    const posts = await getAllPosts();
    const postsByYear: BlogPostsListProps["postsByYear"] = {};

    posts.forEach((post) => {
        const year = new Date(post.date).getUTCFullYear();
        (postsByYear[year] || (postsByYear[year] = [])).push(post);
    });

    return postsByYear;
}