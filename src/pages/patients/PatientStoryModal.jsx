import { useEffect, useRef } from 'react';

export default function PatientStoryModal({ story, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

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

  const fullText = story.body || story.content || story.description || '';
  const introduction = story.excerpt || story.introduction || '';

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-primary-navy-dark/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-story-title"
        onKeyDown={handleKeyDown}
        className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close patient story"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-2xl leading-none text-primary-navy shadow-md transition hover:bg-background-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal sm:right-4 sm:top-4"
        >
          ×
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[240px] overflow-hidden bg-background-blue sm:min-h-[340px] md:min-h-[560px]">
            <img
              src={story.imageUrl}
              alt={story.title ? `Photo for ${story.title}` : 'Patient story'}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <span className="inline-flex rounded-full border border-surface-teal bg-background-blue px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-teal sm:text-xs">
              Shared with permission
            </span>
            <h2 id="patient-story-title" className="mt-4 pr-8 text-2xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-3xl">
              {story.title}
            </h2>

            {introduction && (
              <p className="mt-4 text-base font-medium leading-7 text-text-secondary">
                {introduction}
              </p>
            )}

            <div className="my-6 h-px w-full bg-border-subtle" />

            {fullText ? (
              <div className="whitespace-pre-line text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                {fullText}
              </div>
            ) : (
              <p className="text-sm leading-7 text-text-secondary sm:text-base">
                A full story has not been added to this published post yet.
              </p>
            )}

            <div className="mt-7 border-t border-border-subtle pt-5">
              <p className="text-sm leading-6 text-text-secondary">
                Shri Kanchan Dialysis Centre
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
              >
                Close story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
