import { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import { getPublishedContent } from '../lib/api';
import clinic from '../assets/patient.png';
import PatientGuideSection from './patients/PatientGuideSection';
import PatientStoriesSection from './patients/PatientStoriesSection';
import PatientStoryModal from './patients/PatientStoryModal';
import PatientCTASection from './patients/PatientCTASection';

export default function Patients() {
  const [stories, setStories] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    let live = true;

    getPublishedContent('patients')
      .then((items) => {
        if (!live) return;
        const publishedItems = Array.isArray(items) ? items : [];
        setStories(publishedItems.filter((item) => item?.imageUrl && item?.title));
        setStatus('ready');
      })
      .catch(() => {
        if (live) setStatus('error');
      });

    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedStory) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedStory(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [selectedStory]);

  return (
    <>
      <PageBanner
      
        title="Information for your next visit"
        subtitle="Practical guidance for patients and families. Please confirm individual treatment and preparation instructions with the centre’s care team."
        image={clinic}
      />

      <PatientGuideSection />

      <PatientStoriesSection
        stories={stories}
        status={status}
        onSelectStory={setSelectedStory}
      />

      {selectedStory && (
        <PatientStoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      <PatientCTASection clinic={clinic} />
    </>
  );
}
