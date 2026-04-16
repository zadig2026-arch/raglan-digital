export interface MockupData {
  slug: string;
  business: {
    name: string;
    tagline: string;
    type: string;
    about: string;
  };
  brand: {
    primary: string;
    primaryDark?: string;
    background?: string;
    text?: string;
  };
  hero: {
    image: string;
    headline: string;
    subhead?: string;
    cta?: { label: string; href: string };
  };
  services: Array<{ title: string; description: string }>;
  gallery: string[];
  contact: {
    address: string;
    phone?: string;
    email?: string;
    hours?: Array<{ day: string; hours: string }>;
    instagram?: string;
    website?: string;
  };
}

/**
 * Add a new mockup by copying an existing entry, swapping data,
 * then visiting /mockup/<slug>. Photos can be hot-linked from
 * the prospect's Instagram or any hosted image URL.
 */
export const mockups: MockupData[] = [
  {
    slug: "park-house",
    business: {
      name: "Park House",
      tagline: "A 1928 character home, opposite Victoria Park.",
      type: "Bed & Breakfast — Cambridge",
      about:
        "Built in 1928 as the Midlands Private Hotel, Park House sits in the heart of Cambridge, looking onto Victoria Park. Three upstairs rooms, made-to-order breakfasts, and walking distance to every café, gallery and stable in town.",
    },
    brand: {
      primary: "#7a5d3a",
      primaryDark: "#5c4527",
      background: "#faf6ef",
      text: "#1f1b15",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=2000&q=80",
      headline: "Stay in Cambridge's most loved character home.",
      subhead: "Three rooms. Made breakfasts. Five minutes from anywhere.",
      cta: { label: "Check availability", href: "#book" },
    },
    services: [
      {
        title: "The Garden Room",
        description: "Queen bed, ensuite bath, garden view. Quiet, soft light.",
      },
      {
        title: "The Park Room",
        description: "King bed, ensuite, overlooks Victoria Park. Our largest.",
      },
      {
        title: "The Loft",
        description: "Cosy attic with skylights. Made for slow mornings.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "Victoria Street, Cambridge 3434",
      phone: "07 827 XXXX",
      email: "stay@parkhouse.co.nz",
      hours: [
        { day: "Check-in", hours: "2pm – 7pm" },
        { day: "Check-out", hours: "by 10am" },
      ],
      website: "parkhouse.co.nz",
    },
  },
  {
    slug: "mavis-and-co",
    business: {
      name: "Mavis & Co",
      tagline: "Hamilton East's neighbourhood eatery since 2018.",
      type: "Café & Eatery — Hamilton East",
      about:
        "Owner-operated, family-run, and full of warmth. Honest food made from local ingredients, in a sun-filled spot on Grey Street. Brunch, lunch, and a courtyard for the kids.",
    },
    brand: {
      primary: "#c9722b",
      primaryDark: "#9b551d",
      background: "#fdf9f2",
      text: "#1b1714",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80",
      headline: "Brunch on Grey Street, the way you remember it.",
      subhead: "Sourdough, slow eggs, real coffee. Open 7 days from 7.15am.",
      cta: { label: "See the menu", href: "#menu" },
    },
    services: [
      {
        title: "Brunch all day",
        description: "Eggs benny, sourdough toast, the famous big breakfast.",
      },
      {
        title: "Cabinet & cakes",
        description: "Rotated daily. Made on-site. Packed for the road.",
      },
      {
        title: "Catering",
        description: "Office mornings, christenings, anything in between.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "475 Grey Street (cnr Bridge & Grey), Hamilton East",
      phone: "07 856 8715",
      email: "hello@mavis.co.nz",
      hours: [
        { day: "Mon – Fri", hours: "7.15am – 4.30pm" },
        { day: "Sat – Sun", hours: "7.45am – 4.30pm" },
      ],
      website: "mavis.co.nz",
      instagram: "@mavisandco",
    },
  },
];

export function getMockup(slug: string): MockupData | undefined {
  return mockups.find((m) => m.slug === slug);
}
