import Hero from '../components/Hero';
import HomeCareOverview from '../components/HomeCareOverview';
import AboutSection from '../components/AboutSection';

import BankTransfer from '../components/BankTransfer';
import ContactCTA from '../components/ContactCTA';
import PatientReviewsStatic from '../components/PatientReviews';
import ImpactStats from '../components/ImpactStats';

import WhyChooseUs from '../components/WhyChooseUs';
import HomeServicesSection from '../components/HomeServicesSection';
import VideoCarousel from '../components/VideoCarousel';
import TrusteeSection from '../components/TrusteeSection';
import Specialdaydonate from '../components/Specialdaydonate';


const Home = () => {
  return (
    <>
      <Hero />
      <VideoCarousel/>
      <ImpactStats/>
      <TrusteeSection/>
      <WhyChooseUs/>
      <Specialdaydonate/>
      <HomeServicesSection/>
      <PatientReviewsStatic/>
      <AboutSection />
     
     

      <BankTransfer />

      <HomeCareOverview />


      <ContactCTA />
    </>
  );
};

export default Home;