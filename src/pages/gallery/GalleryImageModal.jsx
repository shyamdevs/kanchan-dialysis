import { useEffect, useRef } from 'react';
import { getGalleryDescription, getGalleryTitle } from './galleryData';

export default function GalleryImageModal({ item, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const title = getGalleryTitle(item);
  const description = getGalleryDescription(item);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab' || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-primary-navy-dark/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        onKeyDown={handleKeyDown}
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white/95 text-2xl leading-none text-primary-navy shadow-sm transition hover:bg-background-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-[1.05fr_0.95fr]">
          <div className="flex min-h-[240px] items-center justify-center bg-neutral-background p-3 sm:min-h-[360px] sm:p-6 md:min-h-[500px]">
            <img
              src={item.imageUrl}
              alt={title}
              className="max-h-[50vh] w-full rounded-xl object-contain object-center sm:max-h-[62vh] md:max-h-[76vh]"
            />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              {item.category || 'Centre gallery'}
            </p>
            <h2
              id="gallery-modal-title"
              className="mt-3 pr-8 text-2xl font-extrabold leading-tight text-primary-navy sm:text-3xl"
            >
              {title}
            </h2>
            <div className="mt-6 h-px w-full bg-border-subtle" />
            <h3 className="mt-6 text-lg font-extrabold text-primary-navy">About this photo</h3>
            {description ? (
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-text-secondary sm:text-base">
                {description}
              </p>
            ) : (
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                No description has been added to this published gallery item yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
