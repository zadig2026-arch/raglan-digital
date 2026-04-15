"use server";

export interface AuditCheck {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
}

export interface AuditResult {
  score: number;
  checks: AuditCheck[];
  url: string;
}

export async function runSeoAudit(rawUrl: string): Promise<AuditResult> {
  let url = rawUrl.trim();
  if (!url.startsWith("http")) url = "https://" + url;

  const checks: AuditCheck[] = [];
  let score = 0;
  const weights: number[] = [];

  // --- URL-based checks (always run) ---

  const isHttps = url.startsWith("https://");
  checks.push({
    label: "HTTPS enabled",
    status: isHttps ? "pass" : "fail",
    detail: isHttps
      ? "Your site uses HTTPS — secure and trusted by search engines."
      : "Your site doesn't use HTTPS. This hurts trust and SEO rankings.",
  });
  weights.push(isHttps ? 10 : 0);

  const domain = url.replace(/https?:\/\//, "").replace(/www\./, "").split("/")[0];
  const domainShort = domain.length <= 20;
  checks.push({
    label: "Domain length",
    status: domainShort ? "pass" : "warn",
    detail: domainShort
      ? `Good — "${domain}" is concise and memorable.`
      : `"${domain}" is quite long. Shorter domains are easier to remember and type.`,
  });
  weights.push(domainShort ? 5 : 2);

  const hasHyphens = domain.includes("-");
  checks.push({
    label: "Domain readability",
    status: hasHyphens ? "warn" : "pass",
    detail: hasHyphens
      ? "Hyphens in domains can look spammy. Consider a cleaner alternative."
      : "Clean domain name — good for branding.",
  });
  weights.push(hasHyphens ? 3 : 5);

  const goodTld = [".com", ".co.nz", ".nz", ".co", ".io", ".org", ".net"].some((tld) =>
    domain.endsWith(tld)
  );
  checks.push({
    label: "Domain extension",
    status: goodTld ? "pass" : "warn",
    detail: goodTld
      ? "Good domain extension for business visibility."
      : "Consider a .co.nz or .com domain for better trust and local SEO.",
  });
  weights.push(goodTld ? 5 : 2);

  // --- Fetch-based checks ---

  let html = "";
  let fetchOk = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RaglanDigitalAudit/1.0; +https://raglandigital.com)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    fetchOk = res.ok;

    if (res.ok) {
      html = await res.text();
    } else {
      checks.push({
        label: "Page reachable",
        status: "fail",
        detail: `Your site returned HTTP ${res.status}. Make sure the page loads correctly.`,
      });
      weights.push(0);
    }
  } catch {
    checks.push({
      label: "Page reachable",
      status: "fail",
      detail:
        "Couldn't reach your site. Check that the URL is correct and the server is running.",
    });
    weights.push(0);
  }

  if (fetchOk && html) {
    // Title tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) {
      checks.push({
        label: "Page title",
        status: "fail",
        detail: "No <title> tag found. This is critical — Google uses it as the main headline in search results.",
      });
      weights.push(0);
    } else if (title.length < 20) {
      checks.push({
        label: "Page title",
        status: "warn",
        detail: `Your title "${title}" is too short (${title.length} chars). Aim for 50-60 characters to fill the Google result.`,
      });
      weights.push(5);
    } else if (title.length > 65) {
      checks.push({
        label: "Page title",
        status: "warn",
        detail: `Your title is ${title.length} characters — Google will truncate it. Aim for under 60 characters.`,
      });
      weights.push(5);
    } else {
      checks.push({
        label: "Page title",
        status: "pass",
        detail: `Good title: "${title}" (${title.length} chars). Within the ideal 50-60 character range.`,
      });
      weights.push(10);
    }

    // Meta description
    const descMatch = html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const desc = descMatch ? descMatch[1].trim() : "";
    if (!desc) {
      checks.push({
        label: "Meta description",
        status: "fail",
        detail:
          "No meta description found. Google may show random text from your page instead.",
      });
      weights.push(0);
    } else if (desc.length < 70) {
      checks.push({
        label: "Meta description",
        status: "warn",
        detail: `Your meta description is short (${desc.length} chars). Aim for 140-160 characters.`,
      });
      weights.push(5);
    } else if (desc.length > 165) {
      checks.push({
        label: "Meta description",
        status: "warn",
        detail: `Your meta description is ${desc.length} characters — Google will truncate it. Keep it under 160.`,
      });
      weights.push(5);
    } else {
      checks.push({
        label: "Meta description",
        status: "pass",
        detail: `Good meta description (${desc.length} chars). Within the ideal range.`,
      });
      weights.push(10);
    }

    // H1 tag
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!h1Matches) {
      checks.push({
        label: "H1 heading",
        status: "fail",
        detail: "No H1 heading found. Every page needs one main heading for SEO.",
      });
      weights.push(0);
    } else if (h1Matches.length > 1) {
      checks.push({
        label: "H1 heading",
        status: "warn",
        detail: `Found ${h1Matches.length} H1 headings. Best practice is to have exactly one H1 per page.`,
      });
      weights.push(5);
    } else {
      const h1Text = h1Matches[0].replace(/<[^>]*>/g, "").trim();
      checks.push({
        label: "H1 heading",
        status: "pass",
        detail: `Good — one H1 found: "${h1Text.substring(0, 60)}${h1Text.length > 60 ? "..." : ""}"`,
      });
      weights.push(10);
    }

    // Images without alt
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const imgsNoAlt = imgTags.filter(
      (img) => !img.match(/alt=["'][^"']+["']/i)
    );
    if (imgTags.length === 0) {
      checks.push({
        label: "Image alt text",
        status: "warn",
        detail: "No images found on the page. Images can help engagement and appear in Google Image search.",
      });
      weights.push(5);
    } else if (imgsNoAlt.length > 0) {
      checks.push({
        label: "Image alt text",
        status: "warn",
        detail: `${imgsNoAlt.length} of ${imgTags.length} images are missing alt text. Alt text helps SEO and accessibility.`,
      });
      weights.push(Math.round((1 - imgsNoAlt.length / imgTags.length) * 10));
    } else {
      checks.push({
        label: "Image alt text",
        status: "pass",
        detail: `All ${imgTags.length} images have alt text. Great for SEO and accessibility.`,
      });
      weights.push(10);
    }

    // Viewport meta
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    checks.push({
      label: "Mobile viewport",
      status: hasViewport ? "pass" : "fail",
      detail: hasViewport
        ? "Viewport meta tag is set — your site tells mobile browsers how to scale."
        : "No viewport meta tag. Your site may not display correctly on mobile devices.",
    });
    weights.push(hasViewport ? 10 : 0);

    // Open Graph
    const hasOg = /<meta[^>]*property=["']og:/i.test(html);
    checks.push({
      label: "Open Graph tags",
      status: hasOg ? "pass" : "warn",
      detail: hasOg
        ? "Open Graph tags found — your links will look good when shared on social media."
        : "No Open Graph tags. Links shared on Facebook/LinkedIn won't have a preview image or description.",
    });
    weights.push(hasOg ? 8 : 2);

    // Canonical URL
    const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(html);
    checks.push({
      label: "Canonical URL",
      status: hasCanonical ? "pass" : "warn",
      detail: hasCanonical
        ? "Canonical URL is set — prevents duplicate content issues."
        : "No canonical URL set. This can lead to duplicate content issues in Google.",
    });
    weights.push(hasCanonical ? 5 : 2);

    // Lang attribute
    const hasLang = /<html[^>]*lang=["'][^"']+["']/i.test(html);
    checks.push({
      label: "Language attribute",
      status: hasLang ? "pass" : "warn",
      detail: hasLang
        ? "Language attribute is set on the HTML tag."
        : 'No lang attribute on <html>. Add lang="en" (or your language) for better accessibility and SEO.',
    });
    weights.push(hasLang ? 5 : 2);
  }

  // Calculate score
  const maxPossible = checks.length * 10;
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  score = maxPossible > 0 ? Math.round((totalWeight / maxPossible) * 100) : 0;

  return { score, checks, url };
}
