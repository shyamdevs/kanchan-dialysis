import {
  getNewsMediaUrl,
  getNewsTitle,
  isVideoNews,
  isYouTubeNews,
} from './newsData';

export default function NewsMedia({ item, large = false, onSelect, onExternalVideo }) {
  const title = getNewsTitle(item);
  const mediaUrl = getNewsMediaUrl(item);

  if (isYouTubeNews(item) && mediaUrl) {
    return (
      <a
        className={`flex ${large ? 'h-[35vh] min-h-[220px] sm:h-[45vh] md:h-[70vh]' : 'aspect-[4/3]'} w-full items-center justify-center gap-2 bg-primary-navy px-5 text-center font-bold text-white transition hover:bg-primary-navy-dark focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-teal`}
        href={mediaUrl}
        target="_blank"
        rel="noreferrer"
        onClick={onExternalVideo}
        aria-label={`Watch video update: ${title} (opens in a new tab)`}
      >
        <span aria-hidden="true">▶</span> Watch video update <span aria-hidden="true">↗</span>
      </a>
    );
  }

  if (isVideoNews(item) && mediaUrl) {
    return (
      <div className={large
        ? 'flex h-[35vh] min-h-[220px] items-center justify-center bg-primary-navy p-2 sm:h-[45vh] md:h-[70vh] md:p-4'
        : 'aspect-[4/3] w-full overflow-hidden bg-primary-navy'}
      >
        <video
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={item.imageUrl || undefined}
          src={mediaUrl}
          aria-label={title}
        >
          Your browser does not support embedded video.
        </video>
      </div>
    );
  }

  if (item?.imageUrl) {
    const image = (
      <img
        className="h-full w-full object-center"
        src={item.imageUrl}
        alt={title}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
      />
    );

    if (onSelect) {
      return (
        <button
          type="button"
          onClick={() => onSelect(item)}
          aria-haspopup="dialog"
          aria-label={`Read full update: ${title}`}
          className={`group block w-full overflow-hidden bg-neutral-background text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-teal ${large ? 'h-[35vh] min-h-[220px] sm:h-[45vh] md:h-[70vh]' : 'aspect-[4/3]'}`}
        >
          <span className="relative block h-full w-full">
            {image}
            {!large && (
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-navy-dark/55 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {/* <span className="text-sm font-extrabold text-white">Read full update <span aria-hidden="true">→</span></span> */}
              </span>
            )}
          </span>
        </button>
      );
    }

    return (
      <div className={`w-full bg-neutral-background ${large ? 'h-[35vh] min-h-[220px] sm:h-[45vh] md:h-[70vh]' : 'aspect-[4/3]'}`}>
        {image}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      aria-label={`Read full update: ${title}`}
      className={`flex w-full items-center justify-center bg-neutral-background text-4xl text-primary-teal ${large ? 'h-[35vh] min-h-[220px] sm:h-[45vh] md:h-[70vh]' : 'aspect-[4/3]'}`}
    >
      <span aria-hidden="true">▤</span>
    </button>
  );
}
