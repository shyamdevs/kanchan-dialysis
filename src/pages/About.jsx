import { useEffect, useState } from "react";
import PageBanner from "../components/PageBanner";
import { getPublishedContent } from "../lib/api";
import { entrance } from "./about/aboutData";
import AboutStorySection from "./about/AboutStorySection";
import PrinciplesSection from "./about/PrinciplesSection";
import JourneySection from "./about/JourneySection";
import TrusteesSection from "./about/TrusteesSection";
import TrusteeModal from "./about/TrusteeModal";
import PrincipleModal from "./about/PrincipleModal";
import PhotoStorySection from "./about/PhotoStorySection";
import AboutCTASection from "./about/AboutCTASection";

export default function About() {
  const [trustees, setTrustees] = useState([]);
  const [trusteeStatus, setTrusteeStatus] = useState("loading");
  const [selectedTrustee, setSelectedTrustee] = useState(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);

  useEffect(() => {
    let live = true;

    getPublishedContent("trustees")
      .then((items) => {
        if (!live) return;
        const publishedItems = Array.isArray(items) ? items : [];
        setTrustees(publishedItems.filter((item) => item?.title && item?.imageUrl));
        setTrusteeStatus("ready");
      })
      .catch(() => {
        if (live) setTrusteeStatus("error");
      });

    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <PageBanner
        label="ABOUT THE CENTRE"
        title={
          <>
            <span className="block">Care With <br/>Compassion,</span>
            <span className="mt-1 block text-secondary-white">Service With  <br/> Purpose</span>
          </>
        }
        subtitle="A dialysis care initiative under Shri Krishan Kanchan Sewa Trust, 
        committed to treating every patient with dignity, respect, and clear guidance."
        image={entrance}
      />

      <AboutStorySection />
      <PrinciplesSection onSelectPrinciple={setSelectedPrinciple} />
      <JourneySection />
      <TrusteesSection
        trustees={trustees}
        trusteeStatus={trusteeStatus}
        onSelectTrustee={setSelectedTrustee}
      />

      {selectedTrustee && (
        <TrusteeModal
          selectedTrustee={selectedTrustee}
          setSelectedTrustee={setSelectedTrustee}
        />
      )}

      {selectedPrinciple && (
        <PrincipleModal
          selectedPrinciple={selectedPrinciple}
          setSelectedPrinciple={setSelectedPrinciple}
        />
      )}

      <PhotoStorySection />
      <AboutCTASection />
    </>
  );
}
