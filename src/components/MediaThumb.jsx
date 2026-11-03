import { useEffect, useRef } from 'react';
import { getVideoUrl } from '../lib/media';

// Silent looping preview used on cards. It only plays while it is on screen
// (saves data and battery) and stays paused for people who prefer reduced motion.
export function LoopingPreview({ src, poster, alt, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.muted = true; // required by browsers for autoplay
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={alt}
      className={className}
    />
  );
}

// Card thumbnail: a silent looping video for video items, otherwise the photo.
// The parent element must be `relative`.
export function MediaThumb({ item, alt, className = '' }) {
  const video = getVideoUrl(item);

  if (video) {
    return (
      <>
        <LoopingPreview src={video} poster={item.imageUrl} alt={alt} className={className} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary-navy-dark/75 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-sm"
        >
          ▶ Video
        </span>
      </>
    );
  }

  return item?.imageUrl ? (
    <img src={item.imageUrl} alt={alt} loading="lazy" decoding="async" className={className} />
  ) : null;
}

// Full-size viewer used inside modals: plays the video (with controls and sound), or shows the photo.
export function MediaViewer({ item, alt, imageClassName = '', videoClassName = '' }) {
  const video = getVideoUrl(item);

  if (video) {
    return (
      <video
        key={video}
        src={video}
        poster={item.imageUrl || undefined}
        controls
        playsInline
        preload="metadata"
        aria-label={alt}
        className={videoClassName}
      >
        Your browser does not support embedded video.
      </video>
    );
  }

  return <img src={item?.imageUrl} alt={alt} className={imageClassName} />;
}
