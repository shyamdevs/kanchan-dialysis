import { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import { getPublishedContent } from '../lib/api';
import newsBackdrop from '../assets/kanchan-dialysis-news-updates-banner.jpg';
import { getPublishedNewsItems } from './news/newsData';
import NewsSection from './news/NewsSection';
import NewsDetailModal from './news/NewsDetailModal';

export default function News() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    let live = true;

    getPublishedContent('news')
      .then((records) => {
        if (!live) return;
        setItems(getPublishedNewsItems(records));
        setStatus('ready');
      })
      .catch(() => {
        if (live) setStatus('error');
      });

    return () => {
      live = false;
    };
  }, []);

  // Keep the page behind the dialog still and allow keyboard dismissal.
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
        label="News & Updates"
        title="News, events and centre updates"
        subtitle="Photos, videos, announcements, awareness activities, and community moments published by the centre team."
        image={newsBackdrop}
      />

      <NewsSection
        items={items}
        status={status}
        onSelectItem={setActiveItem}
      />

      {activeItem && (
        <NewsDetailModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}
    </>
  );
}
