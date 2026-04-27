import NewsInsight from "./NewsInsight";
import { getRecentBlogs } from "@/lib/queries/blog.query";
import type { Blog } from "@/payload-types";

export default async function NewsInsightServer() {
  const blogs = await getRecentBlogs(3);

  return <NewsInsight blogs={blogs.docs as Blog[]} />;
}
