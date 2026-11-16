import CountUp from "./CountUp";

const cardClassName =
  "group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-border-subtle bg-white p-7 text-center shadow-[0_8px_30px_rgba(21,60,91,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.10)] sm:p-8";

const cardTopLineClassName =
  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-navy to-primary-teal";

const iconClassName =
  "flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal transition-colors duration-300 group-hover:bg-primary-teal-dark group-hover:text-white";

const numberClassName =
  "mt-6 font-extrabold leading-none tracking-tight text-primary-navy";
const firstDigitClassName = "text-4xl sm:text-5xl";
const restDigitClassName = "text-3xl sm:text-4xl";
const labelClassName = "mt-3 text-base font-bold leading-6 text-primary-navy";
const descriptionClassName = "mt-2 max-w-[260px] text-sm leading-6 text-text-secondary";

const CARDS = [
  {
    duration: 3000,
    end: 10000,
    suffix: "+",
    label: "Dialysis Sessions Completed",
    description: "Dedicated care and continued support for patients.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
  },
  {
    duration: 3000,
    end: 200,
    suffix: "+",
    label: "Monthly Patients Served",
    description: "Supporting patients and families through their care journey.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    duration: 3000,
    end: 5,
    suffix: "+",
    label: "Years of Uninterrupted Service",
    description: "A continued commitment to compassionate community care.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
      </svg>
    ),
  },
];

export default function ImpactStats() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="relative isolate overflow-hidden bg-background-blue py-16 text-primary-navy sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/60 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-surface-teal/50 blur-3xl" />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-teal bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Our Mission in Action
          </div>

          <h2 id="impact-heading" className="font-sans text-3xl font-bold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl">
            Our Growing <span className="text-primary-teal">Impact</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Touching lives and supporting families through accessible kidney care
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <article key={i} className={`${cardClassName} ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <div aria-hidden="true" className={cardTopLineClassName} />
              <div className={iconClassName}>{card.icon}</div>

              <h3 className={numberClassName}>
                <CountUp
                  end={card.end}
                  duration={card.duration}
                  suffix={card.suffix}
                  firstDigitClassName={firstDigitClassName}
                  restClassName={restDigitClassName}
                />
              </h3>

              <p className={labelClassName}>{card.label}</p>
              <p className={descriptionClassName}>{card.description}</p>

              <div className="mt-5 h-1 w-10 rounded-full bg-primary-teal transition-all duration-300 group-hover:w-16" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}