
import entrance from "../assets/KAN6.jpeg";

export default function ContactCTA() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{
        backgroundImage: `linear-gradient(105deg, color-mix(in srgb, var(--color-primary-navy-dark) 94%, transparent) 10%, color-mix(in srgb, var(--color-primary-navy) 86%, transparent) 55%, color-mix(in srgb, var(--color-primary-teal-dark) 76%, transparent) 60%), url("${entrance}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 -z-0 h-80 w-80 rounded-full border border-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 -z-0 h-96 w-96 rounded-full border border-white/15"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        {/* Text over background image */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-surface-teal backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            We Are Here To Help
          </span>

          <h2 className="mt-6 max-w-3xl font-sans text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Every Step Starts With{" "}
            <span className="text-secondary-cyan">
              The Right Guidance.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8 lg:text-lg">
            Have questions about dialysis care or the next steps? Contact
            Shri Kanchan Dialysis Centre. Our team can help you understand
            the available arrangements and the information you may need.
          </p>

          {/* Contact highlights */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-white/90">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-secondary-cyan">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.06 8.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.35 1.83.58 2.79.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </span>
              <span>Speak With Our Team</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-secondary-cyan">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>Shri Kanchan Dialysis Centre</span>
            </div>
          </div>
        </div>

        {/* Contact card */}
        <div className="w-full shrink-0 rounded-3xl border border-white/60 bg-white p-6 text-primary-navy shadow-2xl shadow-black/15 sm:p-8 lg:max-w-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
              <path d="M8 9h8M8 13h5" />
            </svg>
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
            Contact Our Centre
          </p>

          <h3 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
            How Can We Help You?
          </h3>

          <p className="mt-3 text-sm leading-7 text-text-secondary">
            Get in touch for information about the centre and consultation
            arrangements.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="tel:+918005770633"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-primary-teal-dark px-5 py-4 text-sm font-bold text-white shadow-md shadow-primary-teal/20 transition hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.06 8.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.35 1.83.58 2.79.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              Call Now: +91 80057 70633
            </a>

            <a
              href="/contact"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-border-subtle bg-white px-5 py-4 text-sm font-bold text-primary-navy transition hover:border-primary-teal hover:bg-background-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
            >
              Request Consultation
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          </div>

          <p className="mt-4 border-t border-border-subtle pt-4 text-center text-xs leading-5 text-text-secondary">
            Please contact the centre for information specific to your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
