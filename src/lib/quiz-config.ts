export type Service = "website" | "seo" | "ads" | "help";

export type Choice = {
  value: string;
  label: string;
  hint?: string;
};

export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
};

export type Recommendation = {
  headline: string;
  body: string;
  target: { href: string; label: string };
};

export type Track = {
  label: string;
  intro: string;
  questions: Question[];
  recommend: (answers: Record<string, string>) => Recommendation;
};

const businessTypeQuestion: Question = {
  id: "business_type",
  prompt: "What kind of business is it?",
  choices: [
    { value: "cafe", label: "Cafe or food" },
    { value: "shop", label: "Shop or retail" },
    { value: "service", label: "Service pro", hint: "therapist, tradie, consultant…" },
    { value: "artisan", label: "Artisan or maker" },
    { value: "other", label: "Something else" },
  ],
};

const urgencyQuestion: Question = {
  id: "urgency",
  prompt: "When do you need it?",
  choices: [
    { value: "asap", label: "As soon as possible" },
    { value: "month", label: "Within a month" },
    { value: "quarter", label: "Within a few months" },
    { value: "flexible", label: "No rush, I'm exploring" },
  ],
};

export const tracks: Record<Service, Track> = {
  website: {
    label: "I want a website",
    intro: "Let's figure out the right fit for your site.",
    questions: [
      {
        id: "current_site",
        prompt: "Do you already have a website?",
        choices: [
          { value: "none", label: "No, nothing yet" },
          { value: "outdated", label: "Yes, but it's outdated" },
          { value: "ok", label: "Yes, and I just want to improve it" },
        ],
      },
      businessTypeQuestion,
      {
        id: "priority",
        prompt: "What matters most to you?",
        choices: [
          { value: "professional", label: "Looking professional" },
          { value: "customers", label: "Attracting new customers" },
          { value: "editable", label: "Easy to update myself" },
          { value: "speed_seo", label: "Fast and found on Google" },
        ],
      },
      urgencyQuestion,
    ],
    recommend: (a) => {
      if (a.current_site === "none") {
        if (a.urgency === "asap" || a.urgency === "month") {
          return {
            headline: "The $399 launch offer sounds like a perfect match.",
            body: "You don't have a site yet and you need one fast. That's exactly what the launch offer is built for — a complete 1-3 page website in 10 days, for $399 NZD. Five launch spots total.",
            target: { href: "/launch", label: "See the launch offer" },
          };
        }
        return {
          headline: "Let's build your first site, the right way.",
          body: "You don't have a site yet and you've got some runway. We can plan something custom, with no rush. Either the $399 launch offer if you want it quick and simple, or a more involved build if you want more.",
          target: { href: "/services", label: "Explore services" },
        };
      }
      if (a.current_site === "outdated") {
        return {
          headline: "A refresh makes sense.",
          body: "An outdated site is losing you customers — slow, hard to read, not mobile. Rebuilding from scratch is often faster and cheaper than patching the old one. Let's talk about a clean rebuild.",
          target: { href: "/services#web-design", label: "See web design" },
        };
      }
      return {
        headline: "Let's polish what you already have.",
        body: "Your site works but could work better. Speed, SEO basics, a fresh look on key pages — small improvements compound fast. Let's identify the top 3 things to fix first.",
        target: { href: "/tools/seo-audit", label: "Run a free SEO audit" },
      };
    },
  },

  seo: {
    label: "I want SEO",
    intro: "Let's see what's going on with your Google presence.",
    questions: [
      {
        id: "google_presence",
        prompt: "Are you on Google today?",
        choices: [
          { value: "unknown", label: "I don't know" },
          { value: "buried", label: "Not really — hard to find me" },
          { value: "middle", label: "Yes, but I'm buried in results" },
          { value: "ranking", label: "Yes, I rank okay" },
        ],
      },
      businessTypeQuestion,
      {
        id: "seo_goal",
        prompt: "What's the main SEO goal?",
        choices: [
          { value: "local", label: "Show up in local searches" },
          { value: "reviews", label: "Get more Google reviews" },
          { value: "competitor", label: "Beat a specific competitor" },
          { value: "all", label: "All of the above" },
        ],
      },
      urgencyQuestion,
    ],
    recommend: (a) => {
      if (a.google_presence === "unknown") {
        return {
          headline: "Start with a free audit.",
          body: "You don't know where you stand — that's the first thing to fix. The free SEO audit tool runs in 30 seconds and tells you exactly what's working and what's not. No email required.",
          target: { href: "/tools/seo-audit", label: "Run the SEO audit" },
        };
      }
      if (a.google_presence === "buried" || a.google_presence === "middle") {
        return {
          headline: "Full SEO + Google Business service.",
          body: "You know you're not showing up. The monthly SEO service ($250 NZD/mo) handles your Google Business Profile, local keywords, and a monthly fix list. Most local businesses move up within 2-3 months.",
          target: { href: "/services#seo", label: "See the SEO service" },
        };
      }
      return {
        headline: "Let's fine-tune what's working.",
        body: "You're ranking but can push higher. A one-off SEO audit + specific fixes might be all you need — no monthly commitment. Send me your site and I'll tell you where the biggest wins are.",
        target: { href: "/contact", label: "Get a custom quote" },
      };
    },
  },

  ads: {
    label: "I want ads",
    intro: "Let's find the right paid channel for your business.",
    questions: [
      {
        id: "ads_experience",
        prompt: "Have you run paid ads before?",
        choices: [
          { value: "never", label: "Never" },
          { value: "tried_self", label: "I tried once, didn't love it" },
          { value: "agency", label: "Yes, with someone else" },
          { value: "running", label: "I'm running some now" },
        ],
      },
      businessTypeQuestion,
      {
        id: "platform",
        prompt: "Which platform feels right?",
        choices: [
          { value: "meta", label: "Facebook / Instagram" },
          { value: "google", label: "Google Search" },
          { value: "both", label: "Both" },
          { value: "unsure", label: "I have no idea" },
        ],
      },
      urgencyQuestion,
    ],
    recommend: (a) => {
      if (a.ads_experience === "never" && (a.platform === "unsure" || a.platform === "google")) {
        return {
          headline: "Start with Google Business first — it's free.",
          body: "Before spending on ads, most local businesses should max out their free Google Business Profile. It's the highest-ROI lever — often bigger impact than paid ads, at zero cost. If you want to go paid after, we can plan that together.",
          target: { href: "/services#seo", label: "See the SEO + GBP service" },
        };
      }
      if (a.platform === "meta") {
        return {
          headline: "Social + Meta ads is the combo.",
          body: "Good ad creative starts with good content. I can run your Facebook + Instagram presence (posts + ads) for a flat monthly rate. Let's talk about content, audience, and budget.",
          target: { href: "/services#social-media", label: "See social service" },
        };
      }
      return {
        headline: "Let's scope this together.",
        body: "Paid ads are case-by-case — depends heavily on your margins, your competitors, and what you're already doing. Tell me about your business and I'll tell you honestly whether ads are worth it right now.",
        target: { href: "/contact", label: "Get honest advice" },
      };
    },
  },

  help: {
    label: "Help me choose",
    intro: "Four quick questions. I'll point you to what fits.",
    questions: [
      {
        id: "want_more",
        prompt: "What do you want more of?",
        choices: [
          { value: "visibility", label: "Visibility online" },
          { value: "customers", label: "New customers" },
          { value: "repeat", label: "Repeat customers" },
          { value: "brand", label: "Brand awareness" },
        ],
      },
      {
        id: "has_site",
        prompt: "Do you already have a website?",
        choices: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "kinda", label: "Kind of — it's old / Facebook only" },
        ],
      },
      businessTypeQuestion,
      urgencyQuestion,
    ],
    recommend: (a) => {
      if (a.has_site === "no") {
        return {
          headline: "Start with the $399 launch offer.",
          body: "You need a foundation first. The $399 launch offer gives you a clean, fast, mobile-first site in 10 days. Once that's up, we can layer SEO or social on top.",
          target: { href: "/launch", label: "See the launch offer" },
        };
      }
      if (a.has_site === "kinda") {
        return {
          headline: "A proper site, then marketing.",
          body: "Facebook alone won't rank you on Google. A real site is the base. Let's build one that works for you — then we talk SEO and socials afterward.",
          target: { href: "/services#web-design", label: "See web design" },
        };
      }
      if (a.want_more === "visibility" || a.want_more === "customers") {
        return {
          headline: "SEO + Google Business is your next move.",
          body: "You have a site. Now people need to find it. The monthly SEO service handles your Google Business Profile and local ranking — most clients see meaningful movement in 2-3 months.",
          target: { href: "/services#seo", label: "See the SEO service" },
        };
      }
      if (a.want_more === "repeat" || a.want_more === "brand") {
        return {
          headline: "Social media is the lever.",
          body: "Repeat customers and brand come from staying top of mind. Consistent, well-crafted Facebook/Instagram content is often the highest-leverage thing you can do.",
          target: { href: "/services#social-media", label: "See social service" },
        };
      }
      return {
        headline: "Let's talk — I'll give you honest advice.",
        body: "Based on what you said, the best thing is a 15-minute chat. I'll ask a few more questions and tell you what to focus on — even if it's not with me.",
        target: { href: "/contact", label: "Send me a message" },
      };
    },
  },
};

export function isValidService(s: string | null | undefined): s is Service {
  return s === "website" || s === "seo" || s === "ads" || s === "help";
}

export function buildAnswerSummary(
  service: Service,
  answers: Record<string, string>
): string {
  const track = tracks[service];
  const lines = track.questions
    .map((q) => {
      const val = answers[q.id];
      if (!val) return null;
      const choice = q.choices.find((c) => c.value === val);
      return `• ${q.prompt}\n  ${choice?.label ?? val}`;
    })
    .filter(Boolean);
  return `I came through the "${track.label}" quiz.\n\n${lines.join("\n\n")}\n\n(Anything you'd like to add? Type below.)`;
}
