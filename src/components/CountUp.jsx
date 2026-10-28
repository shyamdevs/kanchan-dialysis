import { useEffect, useRef, useState } from "react";

/**
 * Animated counter that starts when it enters the viewport.
 * Respects reduced-motion preferences and formats numbers for India.
 */
function CountUp({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  separator = true,
}) {
  const [value, setValue] = useState(0);
  const spanRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return undefined;

    const target = Number(end) || 0;
    let frameId;
    const motionPreference = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionPreference?.matches || typeof IntersectionObserver === "undefined") {
      setValue(target);
      hasAnimated.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible || hasAnimated.current) return;

        hasAnimated.current = true;
        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * target));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          } else {
            setValue(target);
          }
        };

        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  const formatted = separator ? value.toLocaleString("en-IN") : value;

  return (
    <span ref={spanRef}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const cardClassName =
  "group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-border-subtle bg-white p-7 text-center shadow-[0_8px_30px_rgba(21,60,91,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.10)] sm:p-8";

const cardTopLineClassName =
  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-navy to-primary-teal";

const iconClassName =
  "flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal transition-colors duration-300 group-hover:bg-primary-teal-dark group-hover:text-white";

const numberClassName =
  "mt-6 text-4xl font-extrabold tracking-tight text-primary-navy tabular-nums sm:text-5xl";

const labelClassName =
  "mt-3 text-base font-bold leading-6 text-primary-navy";

const descriptionClassName =
  "mt-2 max-w-[260px] text-sm leading-6 text-text-secondary";

function ImpactCard({ children, className = "" }) {
  return <article className={`${cardClassName} ${className}`}>{children}</article>;
}

export default function ImpactStats() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="relative isolate overflow-hidden bg-background-blue py-16 text-primary-navy sm:py-20 lg:py-24"
    >
      {/* Soft decorative background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-surface-teal/50 blur-3xl"
      />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-teal bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Our Mission in Action
          </div>

          <h2
            id="impact-heading"
            className="font-sans text-3xl font-bold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
          >
            Our Growing <span className="text-primary-teal">Impact</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Measuring our success not in revenue, but in lives touched and
            families supported through accessible renal care.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
        </div>

        {/* Impact cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {/* Card 1: Dialysis sessions completed */}
          <ImpactCard>
            <div aria-hidden="true" className={cardTopLineClassName} />

            <div className={iconClassName}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>

            <h3 className={numberClassName}>
              <CountUp end={10000} suffix="+" />
            </h3>

            <p className={labelClassName}>Dialysis Sessions Completed</p>
            <p className={descriptionClassName}>
              Dedicated care and continued support for patients.
            </p>

            <div className="mt-5 h-1 w-10 rounded-full bg-primary-teal transition-all duration-300 group-hover:w-16" />
          </ImpactCard>

          {/* Card 2: Monthly patients served */}
          <ImpactCard>
            <div aria-hidden="true" className={cardTopLineClassName} />

            <div className={iconClassName}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            <h3 className={numberClassName}>
              <CountUp end={200} suffix="+" />
            </h3>

            <p className={labelClassName}>Monthly Patients Served</p>
            <p className={descriptionClassName}>
              Supporting patients and families through their care journey.
            </p>

            <div className="mt-5 h-1 w-10 rounded-full bg-primary-teal transition-all duration-300 group-hover:w-16" />
          </ImpactCard>

          {/* Card 3: Years of uninterrupted service */}
          <ImpactCard className="sm:col-span-2 lg:col-span-1">
            <div aria-hidden="true" className={cardTopLineClassName} />

            <div className={iconClassName}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
              </svg>
            </div>

            <h3 className={numberClassName}>
              <CountUp end={3} suffix="+" />
            </h3>

            <p className={labelClassName}>Years of Uninterrupted Service</p>
            <p className={descriptionClassName}>
              A continued commitment to compassionate community care.
            </p>

            <div className="mt-5 h-1 w-10 rounded-full bg-primary-teal transition-all duration-300 group-hover:w-16" />
          </ImpactCard>
        </div>
      </div>
    </section>
  );
}
