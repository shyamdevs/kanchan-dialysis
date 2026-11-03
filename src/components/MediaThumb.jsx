import { getVideoUrl } from '../lib/media';

// Card thumbnail: shows the photo (or video poster) and a play badge for videos.
// The parent element must be `relative`.
export function MediaThumb({ item, alt, className = '' }) {
  const video = getVideoUrl(item);

  return (
    <>
      {item?.imageUrl ? (
        <img src={item.imageUrl} alt={alt} loading="lazy" decoding="async" className={className} />
      ) : video ? (
        <video
          src={`${video}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          className={className}
        />
      ) : null}
      {video && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-navy-dark/70 pl-1 text-xl text-white shadow-lg ring-2 ring-white/70 backdrop-blur-sm">
            ▶
          </span>
        </span>
      )}
    </>
  );
}

// Full-size viewer used inside modals: plays the video, or shows the photo.
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
