
import entrance from "../assets/KAN6.jpeg";
import facility from "../assets/KAN9.jpeg";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-section-title"
      className="relative isolate overflow-hidden bg-background-blue py-16 font-sans text-primary-navy sm:py-20 lg:py-24"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full bg-surface-teal/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-surface-teal/70 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Image Composition */}
        <div className="relative mx-auto w-full max-w-[620px] pb-12 pr-5 sm:pb-16 sm:pr-10">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_24px_65px_rgba(21,60,91,0.14)] sm:rounded-[2rem]">
            <img
              src={entrance}
              alt="Main Entrance Of Shri Kanchan Dialysis Centre"
              loading="lazy"
              className="h-[320px] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[430px] lg:h-[470px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary-navy/25 via-transparent to-transparent"
            />
          </div>

          {/* Floating Facility Image */}
          <div className="absolute bottom-0 right-0 z-10 w-[52%] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_16px_40px_rgba(21,60,91,0.15)] sm:rounded-3xl">
            <img
              src={facility}
              alt="Dialysis Treatment Area At The Centre"
              loading="lazy"
              className="h-28 w-full object-cover sm:h-40"
            />

            <div className="flex items-center gap-2 p-3 sm:p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-teal text-primary-teal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </span>

              <p className="text-xs font-bold leading-5 text-primary-navy sm:text-sm">
                A Place Built Around Care
              </p>
            </div>
          </div>

          {/* Centre Label */}
          <div className="absolute left-2 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-2 text-[10px] font-bold tracking-wide text-primary-navy shadow-lg backdrop-blur sm:left-4 sm:px-4 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Our Centre · Jaipur
          </div>

          {/* Decorative Accent */}
          <div
            aria-hidden="true"
            className="absolute -right-1 top-10 -z-10 h-28 w-28 rounded-tr-[3rem] border-r-[10px] border-t-[10px] border-surface-teal sm:-right-2 sm:h-36 sm:w-36"
          />
        </div>

        {/* About Content */}
        <div className="max-w-[650px]">
          <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-teal sm:text-sm">
            <span className="h-[2px] w-10 bg-primary-teal" />
            Our Story
          </div>

          <h2
            id="about-section-title"
            className="mt-5 text-3xl font-bold leading-[1.2] tracking-tight text-primary-navy sm:text-4xl lg:text-[3.25rem]"
          >
            A Commitment To Care,{" "}
            <span className="text-primary-teal">Dignity And Seva.</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Shri Kanchan Dialysis Centre operates under Shri Krishan Kanchan
            Sewa Trust. Its purpose is to help make dialysis care accessible
            and to treat every person who comes through the doors with respect.
          </p>

          <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Behind every visit is a patient and a family navigating difficult
            decisions. We aim to offer a welcoming care environment, clear
            information, and a team that can help families understand the next
            practical step.
          </p>

          {/* Trust Card */}
          <div className="mt-7 flex items-start gap-4 rounded-2xl border border-border-subtle bg-white p-4 shadow-[0_8px_30px_rgba(21,60,91,0.05)] sm:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-teal text-primary-teal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>

            <div>
              <h3 className="text-sm font-bold leading-6 text-primary-navy sm:text-base">
                A Unit Of Shri Krishan Kanchan Sewa Trust
              </h3>

              <p className="mt-1 text-xs leading-6 text-text-secondary sm:text-sm">
                Service Guided By Compassion, Transparency, And Respect For
                Patients And Families.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/about"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary-teal-dark px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-teal/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:text-base"
          >
            Learn About Us

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
