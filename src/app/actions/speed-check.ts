"use server";

export interface SpeedMetric {
  label: string;
  value: string;
  status: "good" | "ok" | "poor";
  tip: string;
}

export interface SpeedResult {
  score: number;
  metrics: SpeedMetric[];
  url: string;
}

export async function runSpeedCheck(rawUrl: string): Promise<SpeedResult> {
  let url = rawUrl.trim();
  if (!url.startsWith("http")) url = "https://" + url;

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;

  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });

  if (!res.ok) {
    throw new Error(`PageSpeed API returned ${res.status}`);
  }

  const data = await res.json();

  const lighthouse = data.lighthouseResult;
  if (!lighthouse) {
    throw new Error("No Lighthouse data returned");
  }

  const score = Math.round((lighthouse.categories?.performance?.score ?? 0) * 100);
  const audits = lighthouse.audits ?? {};

  const metrics: SpeedMetric[] = [];

  // LCP
  const lcp = audits["largest-contentful-paint"];
  if (lcp) {
    const lcpVal = (lcp.numericValue / 1000).toFixed(1);
    const lcpNum = parseFloat(lcpVal);
    metrics.push({
      label: "Largest Contentful Paint (LCP)",
      value: `${lcpVal}s`,
      status: lcpNum <= 2.5 ? "good" : lcpNum <= 4 ? "ok" : "poor",
      tip:
        lcpNum <= 2.5
          ? "Good — main content loads quickly."
          : "Optimize your largest image or text block. Consider lazy loading and modern image formats (WebP).",
    });
  }

  // FCP
  const fcp = audits["first-contentful-paint"];
  if (fcp) {
    const fcpVal = (fcp.numericValue / 1000).toFixed(1);
    const fcpNum = parseFloat(fcpVal);
    metrics.push({
      label: "First Contentful Paint (FCP)",
      value: `${fcpVal}s`,
      status: fcpNum <= 1.8 ? "good" : fcpNum <= 3 ? "ok" : "poor",
      tip:
        fcpNum <= 1.8
          ? "Good — users see content quickly."
          : "Reduce render-blocking CSS and JavaScript. Inline critical CSS.",
    });
  }

  // TBT (replaces FID in Lighthouse)
  const tbt = audits["total-blocking-time"];
  if (tbt) {
    const tbtVal = Math.round(tbt.numericValue);
    metrics.push({
      label: "Total Blocking Time (TBT)",
      value: `${tbtVal}ms`,
      status: tbtVal <= 200 ? "good" : tbtVal <= 600 ? "ok" : "poor",
      tip:
        tbtVal <= 200
          ? "Good — site responds quickly to interactions."
          : "Reduce JavaScript execution time. Split large bundles and defer non-critical scripts.",
    });
  }

  // CLS
  const cls = audits["cumulative-layout-shift"];
  if (cls) {
    const clsVal = cls.numericValue.toFixed(2);
    const clsNum = parseFloat(clsVal);
    metrics.push({
      label: "Cumulative Layout Shift (CLS)",
      value: clsVal,
      status: clsNum <= 0.1 ? "good" : clsNum <= 0.25 ? "ok" : "poor",
      tip:
        clsNum <= 0.1
          ? "Good — layout is stable during loading."
          : "Add width/height to images. Avoid inserting content above existing content.",
    });
  }

  // Speed Index
  const si = audits["speed-index"];
  if (si) {
    const siVal = (si.numericValue / 1000).toFixed(1);
    const siNum = parseFloat(siVal);
    metrics.push({
      label: "Speed Index",
      value: `${siVal}s`,
      status: siNum <= 3.4 ? "good" : siNum <= 5.8 ? "ok" : "poor",
      tip:
        siNum <= 3.4
          ? "Good — page visually completes quickly."
          : "Optimize the order in which content is loaded. Prioritize above-the-fold content.",
    });
  }

  // TTFB
  const ttfb = audits["server-response-time"];
  if (ttfb) {
    const ttfbVal = Math.round(ttfb.numericValue);
    metrics.push({
      label: "Time to First Byte (TTFB)",
      value: `${ttfbVal}ms`,
      status: ttfbVal <= 400 ? "good" : ttfbVal <= 800 ? "ok" : "poor",
      tip:
        ttfbVal <= 400
          ? "Good — server responds fast."
          : "Consider upgrading hosting, enabling caching, or using a CDN.",
    });
  }

  return { score, metrics, url };
}
