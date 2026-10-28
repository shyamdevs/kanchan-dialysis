import Hero from '../components/Hero';
import HomeCareOverview from '../components/HomeCareOverview';
import AboutSection from '../components/AboutSection';

import BankTransfer from '../components/BankTransfer';
import ContactCTA from '../components/ContactCTA';
import PatientReviewsStatic from '../components/PatientReviews';
import ImpactStats from '../components/CountUp';
import WhyChooseUs from '../components/WhyChooseUs';
import HomeServicesSection from '../components/HomeServicesSection';


const Home = () => {
  return (
    <>
      <Hero />
      <ImpactStats/>
      <HomeCareOverview />
      <WhyChooseUs/>
      <HomeServicesSection/>
      <PatientReviewsStatic/>
      <AboutSection />
     
     
      

      <BankTransfer />



      <ContactCTA />
    </>
  );
};

export default Home;