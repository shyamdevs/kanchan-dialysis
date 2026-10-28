import treatmentImage from "../../assets/KAN1.jpeg";
import teamPhoto from "../../assets/KAN3.jpeg";
import entrance from "../../assets/KAN6.jpeg";
import facilityImage from "../../assets/KAN9.jpeg";

export { treatmentImage, teamPhoto, entrance, facilityImage };

export const principles = [
  {
    mark: "♡",
    title: "Our mission",
    text: "Support access to dialysis care and help patients navigate their care journey with dignity and respect.",
    description:
      "Our mission is to make the dialysis care journey easier to understand and navigate for patients and their families. We aim to treat every person with dignity, share clear information about available services and next steps, and help people connect with the support they may need.",
    commitments: [
      {
        title: "Dignity in every interaction",
        text: "Treat every patient and family with empathy, patience, and respect.",
      },
      {
        title: "Clear guidance",
        text: "Explain available services and next steps in language patients can understand.",
      },
      {
        title: "Support for families",
        text: "Help patients and caregivers know where to turn when they have questions.",
      },
    ],
  },
  {
    mark: "◎",
    title: "Our vision",
    text: "A community where financial hardship is less likely to stand between a person and the care they need.",
    description:
      "We envision a community where financial hardship is less likely to prevent someone from seeking the dialysis care they need. Through a welcoming care environment, clear guidance, and community support, we hope to make the care journey more accessible and less isolating.",
    commitments: [
      {
        title: "Fewer barriers",
        text: "Help people find clear information about care and available support.",
      },
      {
        title: "A welcoming environment",
        text: "Help patients feel heard, respected, and comfortable asking questions.",
      },
      {
        title: "Community involvement",
        text: "Encourage people to support a more caring and informed community.",
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
