// Public API — unchanged for all consumers. Blog posts come from the active site.
import { getActiveSite } from "@/lib/site";
import type { BlogPost } from "@/lib/blogPosts.data";
export type { BlogPost } from "@/lib/blogPosts.data";

export const blogPosts: BlogPost[] = getActiveSite().blogPosts;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
