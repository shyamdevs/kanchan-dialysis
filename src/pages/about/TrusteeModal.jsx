import { useEffect, useRef } from "react";
import { getTrusteeRole, getTrusteeIntroduction } from "./aboutData";

export default function TrusteeModal({ selectedTrustee, setSelectedTrustee }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTrustee(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [setSelectedTrustee]);

  return (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-primary-navy-dark/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedTrustee(null);
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="trustee-modal-title"
            aria-describedby="trustee-modal-introduction"
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl sm:rounded-3xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedTrustee(null)}
              aria-label="Close trustee profile"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-2xl leading-none text-primary-navy shadow-md transition hover:bg-background-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal sm:right-4 sm:top-4"
            >
              ×
            </button>

            <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden bg-background-blue p-4 sm:min-h-[340px] sm:p-6 md:min-h-[500px]">
                <img
                  src={selectedTrustee.imageUrl}
                  alt={`${selectedTrustee.title} — ${getTrusteeRole(selectedTrustee)}`}
                  className="max-h-[48vh] w-full rounded-xl object-contain object-center sm:max-h-[62vh] md:max-h-[75vh]"
                />
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <span className="inline-flex rounded-full border border-surface-teal bg-background-blue px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-teal sm:text-xs">
                  Trustee profile
                </span>
                <h2
                  id="trustee-modal-title"
                  className="mt-4 pr-8 text-2xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-3xl"
                >
                  {selectedTrustee.title}
                </h2>
                <p className="mt-2 text-base font-bold text-primary-teal">
                  {getTrusteeRole(selectedTrustee)}
                </p>
                <div className="my-6 h-px w-full bg-border-subtle" />
                <h3 className="text-lg font-extrabold text-primary-navy">Introduction</h3>
                {getTrusteeIntroduction(selectedTrustee) ? (
                  <p id="trustee-modal-introduction" className="mt-3 whitespace-pre-line text-sm leading-7 text-text-secondary sm:text-base">
                    {getTrusteeIntroduction(selectedTrustee)}
                  </p>
                ) : (
                  <p id="trustee-modal-introduction" className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                    An introduction has not been added to this trustee’s published profile yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
  );
}
