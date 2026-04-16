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
    slug: "rua-resort",
    business: {
      name: "Rua Resort",
      tagline: "Country views, fresh eggs, real rest.",
      type: "Boutique B&B — Hamilton outskirts",
      about:
        "On a quiet hill north of Hamilton, looking onto Mount Pirongia. Family-run, with breakfast eggs from our own free-range hens, panoramic pasture views and rooms made for slow mornings. Twenty minutes from town, a world away from it.",
    },
    brand: {
      primary: "#5e7651",
      primaryDark: "#42563a",
      background: "#f6f4ed",
      text: "#1a1d17",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=2000&q=80",
      headline: "Wake up to Mount Pirongia.",
      subhead:
        "Free-range eggs at breakfast. Pastures out the window. Twenty minutes from Hamilton CBD.",
      cta: { label: "Check availability", href: "#book" },
    },
    services: [
      {
        title: "Garden Suite",
        description: "Queen bed, ensuite, doors onto the herb garden.",
      },
      {
        title: "Pirongia Room",
        description: "King bed, bath, full mountain view at sunrise.",
      },
      {
        title: "The Cottage",
        description: "Self-contained for two. Stay a week, feel like a year.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "170 Foster Road, RD 10, Hamilton 3290",
      phone: "07 847 0407",
      email: "stay@ruaresort.co.nz",
      hours: [
        { day: "Check-in", hours: "3pm – 7pm" },
        { day: "Check-out", hours: "by 10am" },
      ],
      website: "ruaresort.com",
    },
  },
  {
    slug: "adaia-flora",
    business: {
      name: "Adaia Flora",
      tagline: "Romantic, wild bouquets, made by hand.",
      type: "Florist & Floral Design — Hamilton",
      about:
        "Studio-based florist working with seasonal, sustainably sourced blooms. Wedding florals, weekly bouquets and one-off arrangements that feel collected rather than composed. Quiet, considered, never cookie-cutter.",
    },
    brand: {
      primary: "#b9745f",
      primaryDark: "#8e5645",
      background: "#fbf6f1",
      text: "#221816",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=2000&q=80",
      headline: "Flowers, but make them feel found.",
      subhead:
        "Seasonal arrangements for weddings, weekly subscriptions, and one-off moments.",
      cta: { label: "Order a bouquet", href: "#order" },
    },
    services: [
      {
        title: "Weddings",
        description: "Bouquets, ceremony pieces, and floral installations.",
      },
      {
        title: "Weekly Bloom",
        description: "A fresh arrangement on your bench, every week.",
      },
      {
        title: "Just Because",
        description: "Single-occasion bouquets, delivered Hamilton-wide.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "Hamilton studio (by appointment)",
      email: "hello@adaiaflora.co.nz",
      hours: [
        { day: "Order online", hours: "anytime" },
        { day: "Delivery", hours: "Tue – Sat" },
      ],
      website: "adaiaflora.co.nz",
      instagram: "@adaiaflora",
    },
  },
  {
    slug: "pied-potter",
    business: {
      name: "The Pied Potter",
      tagline: "Handbuilt ceramics & pottery parties in the Waikato.",
      type: "Ceramics Studio — Cambridge",
      about:
        "A small Cambridge studio making handbuilt, oven-safe ceramics with a playful streak. Also home to pottery parties — kids' birthdays, hen dos, team afternoons — where you actually get your hands in the clay.",
    },
    brand: {
      primary: "#a86b4b",
      primaryDark: "#7a4d34",
      background: "#f9f4ee",
      text: "#1c1814",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=2000&q=80",
      headline: "Get your hands in the clay.",
      subhead:
        "Handbuilt ceramics for everyday use, and pottery parties for everyone else.",
      cta: { label: "Book a party", href: "#parties" },
    },
    services: [
      {
        title: "Handbuilt collection",
        description: "Mugs, bowls, planters. Oven-safe, dishwasher-safe.",
      },
      {
        title: "Pottery parties",
        description: "Kids, hens, teams. We bring the clay, you bring the noise.",
      },
      {
        title: "Custom orders",
        description: "Wedding favours, restaurant tableware, gifts.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "Cambridge, Waikato (studio address on booking)",
      email: "hello@thepiedpotter.co.nz",
      hours: [
        { day: "Studio visits", hours: "by appointment" },
        { day: "Parties", hours: "Sat – Sun + weekday evenings" },
      ],
      website: "thepiedpotter.co.nz",
      instagram: "@thepiedpotter",
    },
  },
  {
    slug: "gails-floral",
    business: {
      name: "Gail's Floral Studio",
      tagline: "Hamilton's florist, since 1965.",
      type: "Florist · Family-run for 60 years",
      about:
        "Three generations, one little shop on Worley Place, and 60 years of putting flowers in Hamilton's hands. Wedding florals, sympathy arrangements, and the kind of bouquet you never forget receiving.",
    },
    brand: {
      primary: "#7a2f3a",
      primaryDark: "#581f28",
      background: "#fbf6f0",
      text: "#1d1313",
    },
    hero: {
      image:
        "https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=2000&q=80",
      headline: "Sixty years of flowers in Hamilton.",
      subhead:
        "Weddings, sympathy, the everyday bouquet that makes the week. Same family, same shop, since 1965.",
      cta: { label: "Order flowers", href: "#order" },
    },
    services: [
      {
        title: "Bouquets & gifts",
        description: "Same-day delivery across Hamilton until 2pm.",
      },
      {
        title: "Wedding florals",
        description: "Bouquets, ceremony pieces, reception arrangements.",
      },
      {
        title: "Sympathy",
        description: "Discreet, considered arrangements for hard moments.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?auto=format&fit=crop&w=1200&q=80",
    ],
    contact: {
      address: "7 Worley Place, Hamilton Central 3204",
      phone: "0800 424 573",
      hours: [
        { day: "Mon – Fri", hours: "8.30am – 5pm" },
        { day: "Saturday", hours: "9am – 1pm" },
      ],
      website: "gails.co.nz",
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
