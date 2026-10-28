import { useEffect, useRef } from "react";

export default function PrincipleModal({ selectedPrinciple, setSelectedPrinciple }) {
  const principleDialogRef = useRef(null);
  const principleCloseButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    principleCloseButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPrinciple(null);
        return;
      }
      if (event.key !== "Tab" || !principleDialogRef.current) return;

      const focusable = principleDialogRef.current.querySelectorAll(
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
  }, [setSelectedPrinciple]);

  return (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-primary-navy-dark/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPrinciple(null);
          }}
        >
          <section
            ref={principleDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="principle-modal-title"
            aria-describedby="principle-modal-description"
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="h-1.5 bg-gradient-to-r from-primary-teal to-secondary-cyan" aria-hidden="true" />
            <button
              ref={principleCloseButtonRef}
              type="button"
              onClick={() => setSelectedPrinciple(null)}
              aria-label="Close principles popup"
              className="absolute right-3 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-2xl leading-none text-primary-navy shadow-md transition hover:bg-background-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal sm:right-5 sm:top-5"
            >
              ×
            </button>

            <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-surface-teal bg-background-blue px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-teal sm:text-xs">
                <span aria-hidden="true">{selectedPrinciple.mark}</span>
                What guides us
              </span>
              <h2
                id="principle-modal-title"
                className="mt-5 pr-10 text-2xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-3xl"
              >
                {selectedPrinciple.title}
              </h2>
              <div className="my-5 h-1 w-14 rounded-full bg-primary-teal" aria-hidden="true" />
              <p id="principle-modal-description" className="text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                {selectedPrinciple.description}
              </p>

              <h3 className="mt-7 text-lg font-extrabold text-primary-navy sm:text-xl">
                What this means to us
              </h3>
              <div className="mt-4 space-y-3">
                {selectedPrinciple.commitments.map((commitment) => (
                  <div key={commitment.title} className="flex items-start gap-3 rounded-xl border border-border-subtle bg-neutral-background/70 p-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-teal text-sm font-extrabold text-primary-teal" aria-hidden="true">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary-navy sm:text-base">
                        {commitment.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-text-secondary sm:leading-7">
                        {commitment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-text-secondary">
                  Shri Kanchan Dialysis Centre
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedPrinciple(null)}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
  );
}
