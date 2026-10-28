import { useEffect, useRef } from 'react';
import NewsMedia from './NewsMedia';
import {
  formatNewsDate,
  getNewsBody,
  getNewsDateValue,
  getNewsSummary,
  getNewsTitle,
  getNewsMediaUrl,
  isYouTubeNews,
} from './newsData';

export default function NewsDetailModal({ item, onClose }) {
  const closeButtonRef = useRef(null);
  const title = getNewsTitle(item);
  const dateValue = getNewsDateValue(item);
  const dateLabel = formatNewsDate(dateValue);
  const body = getNewsBody(item);
  const summary = getNewsSummary(item);
  const mediaUrl = getNewsMediaUrl(item);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-primary-navy-dark/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-modal-title"
        className="relative my-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close news update"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-white/95 text-2xl leading-none text-primary-navy shadow-sm transition hover:bg-background-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:overflow-hidden">
          <div className="min-w-0 bg-neutral-background md:flex md:items-center md:justify-center">
            <NewsMedia item={item} large onExternalVideo={() => {}} />
          </div>

          <div className="min-w-0 p-5 sm:p-7 md:max-h-[92vh] md:overflow-y-auto md:p-9 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 pr-10 text-xs font-extrabold uppercase tracking-[0.13em] text-primary-teal">
              {item.category && <span>{item.category}</span>}
              {item.category && dateLabel && <span className="text-text-secondary" aria-hidden="true">•</span>}
              {dateLabel && <time dateTime={dateValue}>{dateLabel}</time>}
            </div>

            <h2 id="news-modal-title" className="mt-3 text-2xl font-extrabold leading-tight text-primary-navy sm:text-3xl">
              {title}
            </h2>

            {summary && (
              <p className="mt-4 text-base font-medium leading-7 text-text-secondary sm:text-lg sm:leading-8">
                {summary}
              </p>
            )}

            {body ? (
              <div className="mt-5 space-y-3 text-text-secondary">
                {body.split(/\r?\n/).map((line, index) =>
                  line.trim() ? <p key={index} className="whitespace-pre-line leading-7">{line}</p> : null,
                )}
              </div>
            ) : !summary ? (
              <p className="mt-5 leading-7 text-text-secondary">
                No additional details have been added to this published update yet.
              </p>
            ) : null}

            {isYouTubeNews(item) && mediaUrl && (
              <a
                href={mediaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg font-bold text-primary-navy underline underline-offset-4 hover:text-primary-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
              >
                Watch related video <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
