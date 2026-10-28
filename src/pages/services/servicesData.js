import entrance from "../../assets/KAN6.jpeg";
import room from "../../assets/KAN9.jpeg";
import ward from "../../assets/KAN10.jpeg";
import equipment from "../../assets/KAN13.jpeg";

export { entrance, room };

// Service information is deliberately written as guidance topics. Confirm current
// availability, eligibility, costs, and clinical arrangements with the centre.
export const services = [
  {
    icon: "✚",
    title: "Free dialysis care",
    body: "The centre’s mission focuses on helping patients access dialysis support. Contact the team to confirm eligibility, availability, and whether free treatment applies to your circumstances.",
  },
  {
    icon: "♡",
    title: "Patient-centred support",
    body: "Patients and caregivers can contact the team for respectful communication and practical guidance as they ask about services, plan a visit, or discuss next steps.",
  },
  {
    icon: "▤",
    title: "Dialysis treatment information",
    body: "Ask the centre whether in-centre haemodialysis is available for your needs. The clinical team must confirm suitability, treatment arrangements, and scheduling.",
  },
  {
    icon: "⌕",
    title: "Pre-treatment assessment guidance",
    body: "Check which clinical assessment, referral, and medical information may be needed before treatment. A qualified care professional will advise on individual requirements.",
  },
 
];

export const facilityPhotos = [
  {
    src: room,
    alt: "Dialysis room with treatment beds",
    label: "Treatment area",
  },
  {
    src: ward,
    alt: "Dialysis room and treatment environment",
    label: "Care environment",
  },
  {
    src: equipment,
    alt: "Dialysis equipment at the centre",
    label: "Treatment equipment",
  },
];

export const preparationChecklist = [
  "Ask the team about visit timing and preparation",
  "Bring available medical reports and prescriptions",
  "Share questions about treatment and the care environment",
];
