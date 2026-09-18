import { createClient } from "@/lib/supabase/server";
import { BlogPost, PostStatus } from "@/lib/types";

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  status: PostStatus;
  created_at: string;
}

function mapPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    coverImage: row.cover_image,
    author: row.author,
    category: row.category,
    status: row.status,
    createdAt: row.created_at,
  };
}

// Same RLS split as campaigns: anonymous visitors only ever see
// status = 'published' rows, a signed-in admin sees everything.
export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapPost);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).filter((p) => p.status === "published");
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPost(data) : null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapPost(data) : null;
}
