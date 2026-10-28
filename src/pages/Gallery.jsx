import { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import { getPublishedContent } from '../lib/api';
import entrance from '../assets/KAN6.jpeg';
import { getApprovedGalleryItems } from './gallery/galleryData';
import GallerySection from './gallery/GallerySection';
import GalleryImageModal from './gallery/GalleryImageModal';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    let live = true;

    getPublishedContent('gallery')
      .then((records) => {
        if (!live) return;
        setItems(getApprovedGalleryItems(records));
        setStatus('ready');
      })
      .catch(() => {
        if (live) setStatus('error');
      });

    return () => {
      live = false;
    };
  }, []);

  // Lock background scrolling and allow Escape to close the image details.
  useEffect(() => {
    if (!activeItem) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveItem(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [activeItem]);

  return (
    <>
      <PageBanner
        label="Gallery"
        title="The centre, care and community"
        subtitle="Photos published by the centre team, focused on the facility, dialysis care, equipment, and community events."
        image={entrance}
      />

      <GallerySection
        items={items}
        status={status}
        onSelectItem={setActiveItem}
      />

      {activeItem && (
        <GalleryImageModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}
    </>
  );
}
