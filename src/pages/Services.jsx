import ServicesHero from "./services/ServicesHero";
import CoreServicesSection from "./services/CoreServicesSection";
import FacilitySection from "./services/FacilitySection";
import ServicesCTASection from "./services/ServicesCTASection";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <CoreServicesSection />
      <FacilitySection />
      <ServicesCTASection />
    </>
  );
}
