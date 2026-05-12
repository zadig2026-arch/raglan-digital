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

// ────────────────────────────────────────
// Projects (case studies)
// ────────────────────────────────────────

export type ProjectStatus = "live" | "in-progress" | "concept" | "archived";
export type ProjectRegion = "FR" | "NZ" | "INTL";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  quoteOriginal?: string;
  author: string;
  role?: string;
}

export interface ProjectLinks {
  live?: string;
  preview?: string;
  source?: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: number;
  sector: string;
  region: ProjectRegion;
  locale: string;
  status: ProjectStatus;
  cover?: string;
  gallery?: string[];
  links?: ProjectLinks;
  stack?: string[];
  brief: string;
  testimonial?: ProjectTestimonial;
  decisions?: string[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  order?: number;
  date: string;
  content: string;
}

export function getProjects(opts?: { featuredOnly?: boolean; region?: ProjectRegion }): Project[] {
  const dir = path.join(contentDir, "projects");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") && !f.endsWith(".draft.mdx"));

  const list = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: filename.replace(".mdx", ""),
      title: data.title || "",
      client: data.client || "",
      role: data.role || "",
      year: data.year || new Date().getFullYear(),
      sector: data.sector || "",
      region: (data.region || "NZ") as ProjectRegion,
      locale: data.locale || "en",
      status: (data.status || "concept") as ProjectStatus,
      cover: data.cover,
      gallery: data.gallery,
      links: data.links,
      stack: data.stack,
      brief: data.brief || "",
      testimonial: data.testimonial,
      decisions: data.decisions,
      metrics: data.metrics,
      featured: data.featured === true,
      order: data.order,
      date: data.date || "",
      content,
    } satisfies Project;
  });

  return list
    .filter((p) => (opts?.featuredOnly ? p.featured : true))
    .filter((p) => (opts?.region ? p.region === opts.region : true))
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
