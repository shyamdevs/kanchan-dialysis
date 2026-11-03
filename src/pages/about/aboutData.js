import treatmentImage from "../../assets/baba.jpeg";
import teamPhoto from "../../assets/KAN3.jpeg";
import entrance from "../../assets/KAN6.jpeg";
import facilityImage from "../../assets/KAN9.jpeg";

export { treatmentImage, teamPhoto, entrance, facilityImage };

export const principles = [
{
  mark: "◎",
  title: "Our vision",
  text: "Taking ahead the vision of Shri Shri 1008 Krishan Kanchan ji Maharaj , to provide cashless and comfortable medical facilities for common man and work for betterment of humanity.",
  description:
    "Our vision is to carry forward the vision of Shri Shri 1008 Krishan Kanchan Ji Maharaj by making cashless and comfortable medical facilities accessible to the common man. We strive to contribute to the betterment of humanity through compassionate care and dedicated service.",
  commitments: [
    {
      title: "Cashless medical facilities",
      text: "Work towards providing accessible, cashless medical facilities for the common man.",
    },
    {
      title: "Comfortable healthcare",
      text: "Create a comfortable and supportive healthcare environment for every patient.",
    },
    {
      title: "Betterment of humanity",
      text: "Continue the spirit of service and compassion for the well-being of society.",
    },
  ],
},
{
  mark: "♡",
  title: "Our mission",
  text: "To assess dialysis needs based on social and demographic factors and provide specialized medical services to rural and urban patients.",
  description:
    "Our mission is to understand the needs and requirements of dialysis patients across different social and demographic backgrounds. We aim to provide specialized dialysis services through qualified medical staff, ensuring that both rural and urban patients receive dedicated care.",
  commitments: [
    {
      title: "Understanding patient needs",
      text: "Analyse dialysis needs, requirements, and service priorities based on social and demographic factors.",
    },
    {
      title: "Specialized medical services",
      text: "Provide expert dialysis services through qualified medical staff for both rural and urban patients.",
    },
  ],
},
  {
    mark: "✦",
    title: "Our values",
    text: "Compassion, service (seva), transparency, and respect for every patient and family.",
    description:
      "Our values guide the way we serve patients, communicate with families, and work with our community. Seva means approaching service with sincerity and care, while transparency and respect help build trust at every step.",
    commitments: [
      {
        title: "Compassion",
        text: "Listen patiently and recognize each person's circumstances and concerns.",
      },
      {
        title: "Seva — service",
        text: "Approach our work as a meaningful service to patients and the community.",
      },
      {
        title: "Transparency",
        text: "Share information clearly and honestly about services and next steps.",
      },
      {
        title: "Respect",
        text: "Protect each person's dignity and treat every patient and family with consideration.",
      },
    ],
  },
];

// Use photos that accurately represent each caption. KAN4 is a memorial-event
// photo, so it is intentionally not presented as a generic community-service image.
export const moments = [
  {
    title: "The centre",
    eyebrow: "Our place",
    image: entrance,
    alt: "Exterior entrance of Shri Kanchan Dialysis Centre",
    imagePosition: "object-center",
  },
  {
    title: "The care environment",
    eyebrow: "Our facility",
    image: facilityImage,
    alt: "Dialysis treatment beds and equipment inside the centre",
    imagePosition: "object-center",
  },
  {
    title: "Community behind the mission",
    eyebrow: "Our community",
    image: teamPhoto,
    alt: "Three people standing together at Shri Kanchan Dialysis Centre",
    imagePosition: "object-center",
  },
];

export const milestones = [
  {
    year: "2021",
    text: "Shri Kanchan Dialysis Centre was established under Shri Krishan Kanchan Sewa Trust.",
  },
  {
    year: "2022",
    text: "The original website records more than 2,000 dialysis sessions in the centre’s early journey.",
  },
  {
    year: "2023",
    text: "The original website notes a focus on developing dialysis capacity and the care environment.",
  },
  {
    year: "2024",
    text: "The website highlights the centre’s mission to make dialysis support accessible to people facing financial hardship.",
  },
  {
    year: "2025",
    text: "The original website records continued service and community support.",
  },
];

export const getTrusteeRole = (person) =>
  person.category || person.role || person.designation || "Trustee";

export const getTrusteeIntroduction = (person) =>
  person.excerpt ||
  person.introduction ||
  person.description ||
  person.content ||
  person.body ||
  "";
