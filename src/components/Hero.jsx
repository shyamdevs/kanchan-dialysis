
import hero from "../assets/Designer.png";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-background-blue text-primary-navy"
    >
      {/* Soft Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-20 h-48 w-48 rounded-full bg-surface-teal/70 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[650px] max-w-[1400px] items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[730px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:px-10 lg:py-14 xl:gap-14">

        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-[700px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary sm:text-xs sm:tracking-[0.18em]">
            <span className="h-[2px] w-10 shrink-0 bg-primary-teal sm:w-14" />
            <span>Shri Kanchan Dialysis Centre · Jaipur</span>
          </div>

          {/* Main Heading */}
          <h1
            id="hero-heading"
            className="mt-7 text-[2.35rem] font-extrabold leading-[1.15] tracking-[-0.045em] text-primary-navy sm:text-5xl sm:leading-[1.12] lg:text-[3.55rem] xl:text-[4rem]"
          >
            <span className="block">Compassionate</span>

            <span className="block text-primary-teal">
              Dialysis Care
            </span>

            <span className="mt-1 block text-[0.76em] leading-[1.3]">
              For Brighter Tomorrows
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[600px] text-sm leading-7 text-text-secondary sm:text-base sm:leading-8 lg:text-lg">
            A mission of seva, dignity, and compassionate kidney care.
            We help patients and families understand their next step
            and connect with the centre’s team.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-primary-teal-dark px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary-teal/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:text-base"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
              </svg>

              Request a Consultation
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="/services"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-primary-navy bg-white/70 px-7 py-4 text-sm font-bold text-primary-navy transition hover:border-primary-teal hover:bg-white hover:text-primary-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:text-base"
            >
              Explore Services
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-9 grid grid-cols-1 gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3 sm:gap-3 sm:border-t-0 sm:pt-0">

            {/* Patient-First Support */}
            <div className="flex items-center gap-3 sm:border-r sm:border-border-subtle sm:pr-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-teal text-primary-teal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 19v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 4v2" />
                </svg>
              </span>

              <span className="text-sm font-semibold leading-6 text-primary-navy">
                Patient-First
                <br />
                Support
              </span>
            </div>

            {/* Trust-Led Mission */}
            <div className="flex items-center gap-3 sm:border-r sm:border-border-subtle sm:px-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-teal text-primary-teal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
              </span>

              <span className="text-sm font-semibold leading-6 text-primary-navy">
                A Trust-Led
                <br />
                Care Mission
              </span>
            </div>

            {/* Family Guidance */}
            <div className="flex items-center gap-3 sm:pl-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-teal text-primary-teal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M20 4c-8 0-14 3-14 11a5 5 0 0 0 5 5c8 0 9-8 9-16Z" />
                  <path d="M3 22c3-6 6-9 12-13" />
                </svg>
              </span>

              <span className="text-sm font-semibold leading-6 text-primary-navy">
                Guidance
                <br />
                For Families
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE PANEL */}
        <div className="relative z-0 mx-auto w-full max-w-[680px] lg:ml-auto">

          {/* Abstract Curved Background */}
          <svg
            aria-hidden="true"
            viewBox="0 0 760 700"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -left-6 -top-10 z-0 h-[calc(100%+5rem)] w-[calc(100%+3rem)]"
          >
            <defs>
              <linearGradient
                id="heroBackdrop"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--color-surface-teal)" />
                <stop offset="100%" stopColor="var(--color-background-blue)" />
              </linearGradient>
            </defs>

            {/* Rounded Arch */}
            <path
              d="M 0 300
                 L 0 160
                 C 0 72 65 5 155 5
                 C 244 5 308 70 308 158
                 L 308 300
                 L 248 300
                 L 248 158
                 C 248 105 212 68 155 68
                 C 98 68 62 105 62 158
                 L 62 300 Z"
              fill="url(#heroBackdrop)"
            />

            {/* Angled Top-Right Accent */}
            <path
              d="M 565 62
                 L 760 24
                 L 760 245
                 L 565 286 Z"
              fill="var(--color-surface-teal)"
            />

            {/* Curved Bottom-Right Sweep */}
            <path
              d="M 760 330
                 L 760 565
                 C 760 645 710 694 635 668
                 C 535 633 440 621 346 649
                 L 370 590
                 C 458 568 555 598 632 624
                 C 679 640 714 610 714 560
                 L 714 330 Z"
              fill="url(#heroBackdrop)"
            />
          </svg>

          {/* Main Image */}
          <div className="relative z-10 h-[320px] overflow-hidden rounded-[1.7rem] border border-white/80 bg-surface-teal shadow-[0_24px_65px_rgba(21,60,91,0.14)] sm:h-[460px] sm:rounded-[2rem] lg:h-[570px] xl:h-[620px]">
            <img
              src={hero}
              alt="Shri Kanchan Dialysis Centre"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary-navy/25 via-transparent to-transparent"
            />
          </div>

          {/* Floating Community Card */}
          <div className="absolute bottom-4 right-3 z-20 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:bottom-6 sm:right-5 sm:gap-4 sm:p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-teal text-primary-teal sm:h-14 sm:w-14">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6 sm:h-7 sm:w-7"
                aria-hidden="true"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
              </svg>
            </span>

            <div>
              <p className="text-sm font-bold leading-5 text-primary-navy sm:text-base">
                People. Care. Community.
              </p>

              <p className="mt-1 text-[11px] leading-4 text-text-secondary sm:text-sm">
                Shri Kanchan Dialysis Centre
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
