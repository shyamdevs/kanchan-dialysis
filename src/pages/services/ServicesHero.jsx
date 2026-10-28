import PageBanner from "../../components/PageBanner";
import { room } from "./servicesData";

export default function ServicesHero() {
  return (
    <PageBanner
      label="Services"
      title="Dialysis care with a focus on dignity"
      subtitle="Learn about our centre and contact the team to confirm available services, eligibility, and how to arrange a visit."
      image={room}
    />
  );
}
