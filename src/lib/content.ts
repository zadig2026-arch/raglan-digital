import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  order?: number;
  image?: string;
  content: string;
}

function getArticles(type: "bible" | "blog"): Article[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).length;
      const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        readingTime,
        category: data.category || "",
        order: data.order,
        image: data.image,
        content,
      };
    })
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getBibleArticles(): Article[] {
  return getArticles("bible");
}

export function getBlogPosts(): Article[] {
  return getArticles("blog");
}

export function getArticleBySlug(type: "bible" | "blog", slug: string): Article | undefined {
  const articles = getArticles(type);
  return articles.find((a) => a.slug === slug);
}
