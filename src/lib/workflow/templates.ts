import { emailLayout, utm } from "./email-layout";

export type TemplateKey =
  | "welcome_tools_day2_top_fix"
  | "welcome_tools_day5_tripwire"
  | "welcome_tools_day9_case_studies"
  | "welcome_tools_day14_final"
  | "nurture_quiz_day0_recap"
  | "nurture_quiz_day3_story"
  | "nurture_quiz_day7_tripwire"
  | "nurture_quiz_day12_pricing"
  | "nurture_quiz_day18_honest"
  | "nurture_quiz_day30_newsletter"
  | "post_discovery_24h_prep"
  | "post_discovery_2h_recap"
  | "post_discovery_48h_nudge"
  | "post_discovery_5d_close"
  | "post_launch_d0_live"
  | "post_launch_d14_gbp"
  | "post_launch_d30_seo_upsell"
  | "post_launch_d60_referral"
  | "post_launch_d90_annual";

export interface TemplateContext {
  name?: string;
  business?: string;
}

export interface RenderedTemplate {
  subject: string;
  html: string;
}

export function renderTemplate(
  key: TemplateKey,
  ctx: TemplateContext,
): RenderedTemplate {
  const greeting = ctx.name ? `Hey ${ctx.name},` : "Hey there,";
  const t = templates[key];
  return t({ ctx, greeting });
}

type Renderer = (args: { ctx: TemplateContext; greeting: string }) => RenderedTemplate;

const templates: Record<TemplateKey, Renderer> = {
  // ─── welcome-tools ───
  welcome_tools_day2_top_fix: ({ greeting }) => ({
    subject: "The #1 thing I'd fix on your site",
    html: emailLayout({
      preheader: "If you only fix one thing this week, fix this.",
      eyebrow: "Day 2 · Quick win",
      title: "If you only fix one thing this week",
      bodyHtml: `
        <p>${greeting}</p>
        <p>You ran one of my free tools a couple of days ago. Whatever the score, here&rsquo;s the single fix that moves the needle most for NZ small businesses:</p>
        <p><strong>Make your homepage say what you do, where, and what to do next — in less than 5 seconds of scanning.</strong></p>
        <p>Most NZ small-business sites bury this. Visitors leave before figuring it out.</p>
        <p>Open your homepage on your phone right now. Squint. Can you tell:</p>
        <ul style="padding-left:20px;line-height:1.6;">
          <li>What you sell?</li>
          <li>Where you&rsquo;re based?</li>
          <li>What button to press to buy / book / call?</li>
        </ul>
        <p>If any of those is &ldquo;not really&rdquo; — that&rsquo;s your fix.</p>
        <p>Want me to look at yours?</p>
      `,
      ctaHref: utm("/contact", "welcome-tools", "day2-top-fix"),
      ctaLabel: "Send me your URL",
    }),
  }),

  welcome_tools_day5_tripwire: ({ greeting }) => ({
    subject: "60-min site roast — $49 NZD",
    html: emailLayout({
      preheader: "A Loom video tearing through your site, ranked fix list, 48h.",
      eyebrow: "Day 5 · Site Roast",
      title: "Want a real human teardown?",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Free tools are great, but they only see the surface. If you want my actual brain on your site for 15 minutes, I made a low-friction option:</p>
        <p><strong>The Site Roast — $49 NZD.</strong></p>
        <ul style="padding-left:20px;line-height:1.6;">
          <li>15-min Loom video walkthrough</li>
          <li>Top 5 fixes ranked by impact</li>
          <li>One-page action plan PDF</li>
          <li>Delivered within 48 hours</li>
          <li>100% money-back if it doesn&rsquo;t help</li>
        </ul>
        <p>Most clients use it as their backlog for the next 3 months.</p>
      `,
      ctaHref: utm("/services", "welcome-tools", "day5-tripwire"),
      ctaLabel: "Book a Site Roast — $49",
    }),
  }),

  welcome_tools_day9_case_studies: ({ greeting }) => ({
    subject: "5 NZ businesses that fixed this in 10 days",
    html: emailLayout({
      preheader: "Park House, Adaia Flora, Flow Wellness — what changed.",
      eyebrow: "Day 9 · Case studies",
      title: "Here&rsquo;s what 10 days of focus looks like",
      bodyHtml: `
        <p>${greeting}</p>
        <p>I&rsquo;m a believer in &ldquo;done is better than perfect&rdquo;. Here are 3 NZ small businesses I&rsquo;ve helped — each one took 5 to 10 days from kickoff to live site:</p>
        <ul style="padding-left:20px;line-height:1.7;">
          <li><strong>Flow Wellness</strong> (Raglan) — booked solid the week the site went live</li>
          <li><strong>Park House</strong> (Raglan) — mobile bounce dropped, direct bookings up</li>
          <li><strong>Adaia Flora</strong> (Hamilton) — clean rebuild from a broken Wix; site is now her main inbound channel</li>
        </ul>
        <p>If you want yours next:</p>
      `,
      ctaHref: utm("/clients", "welcome-tools", "day9-case-studies"),
      ctaLabel: "See the case studies",
    }),
  }),

  welcome_tools_day14_final: ({ greeting }) => ({
    subject: "Last note — then I'll stop",
    html: emailLayout({
      preheader: "If today&rsquo;s not the moment, no worries.",
      eyebrow: "Day 14 · Last email",
      title: "If now isn&rsquo;t the moment, no worries",
      bodyHtml: `
        <p>${greeting}</p>
        <p>This is my last automated email. If you&rsquo;d rather hear from me later, just reply &ldquo;ping me in 3 months&rdquo; and I will.</p>
        <p>If now <em>is</em> the moment — there are usually 5 launch spots open at $399 NZD each month. First-come, first-served.</p>
      `,
      ctaHref: utm("/launch", "welcome-tools", "day14-final"),
      ctaLabel: "See if there's a spot left",
    }),
  }),

  // ─── nurture-quiz ───
  nurture_quiz_day0_recap: ({ greeting }) => ({
    subject: "Your quiz result — and one next step",
    html: emailLayout({
      preheader: "Based on what you said, here&rsquo;s what I&rsquo;d focus on first.",
      eyebrow: "Day 0 · Recap",
      title: "Quick recap from the quiz",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Thanks for taking the 2-min quiz. Based on what you said, the highest-leverage move for you right now is the recommendation I sent on the result page.</p>
        <p>If you want to talk it through with me — 15 minutes, free, no obligation:</p>
      `,
      ctaHref: utm("/contact", "nurture-quiz", "day0-recap"),
      ctaLabel: "Book a 15-min call",
    }),
  }),

  nurture_quiz_day3_story: ({ greeting }) => ({
    subject: "How [a business like yours] went from invisible to fully booked",
    html: emailLayout({
      preheader: "Same starting point, different outcome.",
      eyebrow: "Day 3 · Story",
      title: "Same problem, different outcome",
      bodyHtml: `
        <p>${greeting}</p>
        <p>One of my clients had no site at all 6 weeks ago — just an Instagram page and a phone number. Today their site is the #1 channel for new bookings.</p>
        <p>What changed: a 3-page launch site (10 days), Google Business Profile cleanup, and a single clear call-to-action everywhere. That&rsquo;s it.</p>
        <p>Yours could look the same.</p>
      `,
      ctaHref: utm("/clients", "nurture-quiz", "day3-story"),
      ctaLabel: "See the case studies",
    }),
  }),

  nurture_quiz_day7_tripwire: ({ greeting }) => ({
    subject: "60-min site roast — $49 NZD",
    html: emailLayout({
      preheader: "Lowest-friction way to get my brain on your site.",
      eyebrow: "Day 7 · Site Roast",
      title: "If a full rebuild feels big",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Want my eyes on your business for 15 minutes? The Site Roast — $49 NZD, money-back if it doesn&rsquo;t help.</p>
        <p>Loom video + ranked fix list + one-page action plan, delivered in 48h.</p>
      `,
      ctaHref: utm("/services", "nurture-quiz", "day7-tripwire"),
      ctaLabel: "Book a Site Roast",
    }),
  }),

  nurture_quiz_day12_pricing: ({ greeting }) => ({
    subject: "What it actually costs",
    html: emailLayout({
      preheader: "No retainers, no hidden fees, no \"call for a quote\".",
      eyebrow: "Day 12 · Pricing",
      title: "Honest pricing, public numbers",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Most agencies hide pricing because it&rsquo;s scary. Mine is on the homepage:</p>
        <ul style="padding-left:20px;line-height:1.7;">
          <li><strong>$49</strong> — Site Roast (15-min audit, 48h)</li>
          <li><strong>$399</strong> — Launch Site (1–3 pages, 5–10 days)</li>
          <li><strong>$1,490</strong> — Growth Site (5–7 pages, GBP, 30d support)</li>
          <li><strong>$129/mo</strong> — Care Plan (hosting + edits)</li>
          <li><strong>$349/mo</strong> — SEO Plan (local visibility)</li>
        </ul>
        <p>Cancel monthly anytime. No retainer required.</p>
      `,
      ctaHref: utm("/services", "nurture-quiz", "day12-pricing"),
      ctaLabel: "See all pricing",
    }),
  }),

  nurture_quiz_day18_honest: ({ greeting }) => ({
    subject: "Honest take on whether this is for you",
    html: emailLayout({
      preheader: "If we&rsquo;re a bad fit I&rsquo;d rather tell you now.",
      eyebrow: "Day 18 · Real talk",
      title: "Whether you should work with me — honestly",
      bodyHtml: `
        <p>${greeting}</p>
        <p>I&rsquo;m a good fit if:</p>
        <ul style="padding-left:20px;line-height:1.6;">
          <li>You&rsquo;re a NZ small business (cafe, tradie, therapist, B&amp;B, retail, services)</li>
          <li>You want one clear point of contact, not a project manager</li>
          <li>You like fixed prices and clear timelines</li>
        </ul>
        <p>I&rsquo;m a bad fit if:</p>
        <ul style="padding-left:20px;line-height:1.6;">
          <li>You need an enterprise rebuild (Shopify Plus, multi-region, SaaS)</li>
          <li>You want monthly retainers and quarterly strategy decks</li>
          <li>You&rsquo;d rather DIY with Squarespace</li>
        </ul>
        <p>If we&rsquo;re a fit, reply and let&rsquo;s start.</p>
      `,
      ctaHref: utm("/contact", "nurture-quiz", "day18-honest"),
      ctaLabel: "Send me a message",
    }),
  }),

  nurture_quiz_day30_newsletter: ({ greeting }) => ({
    subject: "Monthly drop — what I&rsquo;ve been up to",
    html: emailLayout({
      preheader: "From now on, just one email per month if anything matters.",
      eyebrow: "Day 30 · Lighter cadence",
      title: "From here, just one email a month",
      bodyHtml: `
        <p>${greeting}</p>
        <p>That&rsquo;s the end of the welcome flow. From now on you&rsquo;ll only hear from me once a month — and only if there&rsquo;s something genuinely useful (a new tool, a new case study, a tip that worked).</p>
        <p>If you want to stop hearing from me at any point, just reply &ldquo;unsubscribe&rdquo;.</p>
      `,
    }),
  }),

  // ─── post-discovery ───
  post_discovery_24h_prep: ({ greeting }) => ({
    subject: "Quick prep for our call tomorrow",
    html: emailLayout({
      preheader: "3 questions to think about before we chat.",
      eyebrow: "T-24h · Prep",
      title: "See you tomorrow — quick prep",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Excited to talk. Three quick questions to noodle on:</p>
        <ul style="padding-left:20px;line-height:1.7;">
          <li>What does &ldquo;winning&rdquo; look like for your business in 3 months?</li>
          <li>What&rsquo;s the #1 thing your current site (or lack of one) is costing you?</li>
          <li>If money were no object, what would your ideal customer experience look like?</li>
        </ul>
        <p>No prep document needed — just turn up.</p>
      `,
    }),
  }),

  post_discovery_2h_recap: ({ greeting }) => ({
    subject: "Here&rsquo;s what we agreed",
    html: emailLayout({
      preheader: "Recap, scope, next step.",
      eyebrow: "Recap",
      title: "Recap from our call",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Quick recap of what we discussed and the next step. I&rsquo;ll send the scope document separately within the day.</p>
        <p>To lock in your spot, the deposit link is ready when you are.</p>
      `,
      ctaHref: utm("/launch", "post-discovery", "2h-recap"),
      ctaLabel: "Lock in my spot",
    }),
  }),

  post_discovery_48h_nudge: ({ greeting }) => ({
    subject: "Still keen?",
    html: emailLayout({
      preheader: "No pressure — just a friendly nudge.",
      eyebrow: "Friendly nudge",
      title: "Still keen?",
      bodyHtml: `
        <p>${greeting}</p>
        <p>I&rsquo;ve held a launch spot for you. If today&rsquo;s not the right moment, just reply and I&rsquo;ll release it back to the pool. No hard feelings.</p>
      `,
      ctaHref: utm("/launch", "post-discovery", "48h-nudge"),
      ctaLabel: "Confirm my spot",
    }),
  }),

  post_discovery_5d_close: ({ greeting }) => ({
    subject: "Should I close your spot?",
    html: emailLayout({
      preheader: "I&rsquo;ll release it tomorrow if I don&rsquo;t hear back.",
      eyebrow: "Last call",
      title: "Closing your spot tomorrow",
      bodyHtml: `
        <p>${greeting}</p>
        <p>I&rsquo;ll need to release your launch spot tomorrow if I don&rsquo;t hear back. No worries either way — life happens.</p>
        <p>One reply (yes / not now / later) is all I need.</p>
      `,
    }),
  }),

  // ─── post-launch-care ───
  post_launch_d0_live: ({ greeting }) => ({
    subject: "Your site is live 🎉",
    html: emailLayout({
      preheader: "Live, indexed, mobile-ready. Here&rsquo;s what&rsquo;s next.",
      eyebrow: "Day 0 · Live",
      title: "Your site is live",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Done. The site is live, the SSL is on, the sitemap is submitted to Google Search Console. Welcome to the internet, properly.</p>
        <p>Want me to keep things fresh — hosting, edits, backups, uptime?</p>
        <p><strong>Care Plan — $129/mo NZD.</strong> Cancel anytime. Your first month is free as a thank-you for trusting the process.</p>
      `,
      ctaHref: utm("/contact?service=care-plan", "post-launch-care", "d0-live"),
      ctaLabel: "Activate Care Plan (first month free)",
    }),
  }),

  post_launch_d14_gbp: ({ greeting }) => ({
    subject: "How to get found on Google (it&rsquo;s mostly free)",
    html: emailLayout({
      preheader: "Google Business Profile is the highest-ROI lever for local NZ.",
      eyebrow: "Day 14 · Local SEO",
      title: "Most-overlooked: Google Business Profile",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Your site is live, but it won&rsquo;t magically appear on Google. The single highest-ROI lever for NZ local businesses is your Google Business Profile.</p>
        <p>Three steps:</p>
        <ol style="padding-left:20px;line-height:1.7;">
          <li>Claim and verify (if you haven&rsquo;t)</li>
          <li>Upload at least 10 photos</li>
          <li>Ask 5 happy customers for a review this week</li>
        </ol>
        <p>If you want me to handle it monthly:</p>
      `,
      ctaHref: utm("/services", "post-launch-care", "d14-gbp"),
      ctaLabel: "See the SEO Plan",
    }),
  }),

  post_launch_d30_seo_upsell: ({ greeting }) => ({
    subject: "Want to be found, not just live?",
    html: emailLayout({
      preheader: "30 days in. Time to talk visibility.",
      eyebrow: "Day 30 · SEO Plan",
      title: "Time to talk visibility",
      bodyHtml: `
        <p>${greeting}</p>
        <p>You&rsquo;ve had the site for 30 days. By now you probably have a sense of whether traffic is flowing or not.</p>
        <p>If it&rsquo;s not — that&rsquo;s normal. Sites don&rsquo;t magic-rank themselves. The SEO Plan ($349/mo NZD) is what most of my clients add at month 1 or 2 to fix that.</p>
        <ul style="padding-left:20px;line-height:1.6;">
          <li>Google Business Profile management</li>
          <li>Local keyword targeting</li>
          <li>Monthly fix list + report</li>
          <li>Cancel anytime</li>
        </ul>
      `,
      ctaHref: utm("/services", "post-launch-care", "d30-seo-upsell"),
      ctaLabel: "Start the SEO Plan",
    }),
  }),

  post_launch_d60_referral: ({ greeting }) => ({
    subject: "Know another NZ business who&rsquo;d use this?",
    html: emailLayout({
      preheader: "Referrals get a free month of Care Plan + a $50 thank-you.",
      eyebrow: "Day 60 · Referral",
      title: "If you know someone who needs this",
      bodyHtml: `
        <p>${greeting}</p>
        <p>If you know another NZ small business that could use a $399 launch site, I&rsquo;d love an intro.</p>
        <p>You get a free month of Care Plan and a $50 thank-you. They get the launch price even if the batch is full.</p>
        <p>Just reply with their name and number — I&rsquo;ll take it from there.</p>
      `,
    }),
  }),

  post_launch_d90_annual: ({ greeting }) => ({
    subject: "Quick check — anything to refresh?",
    html: emailLayout({
      preheader: "3 months in. Anything to update?",
      eyebrow: "Day 90 · Refresh",
      title: "3 months in — anything to update?",
      bodyHtml: `
        <p>${greeting}</p>
        <p>Quarterly check-in. Anything stale on the site? New photos? New services? New hours? Reply with whatever needs updating and I&rsquo;ll knock it out.</p>
      `,
      ctaHref: utm("/contact", "post-launch-care", "d90-annual"),
      ctaLabel: "Send me updates",
    }),
  }),
};
