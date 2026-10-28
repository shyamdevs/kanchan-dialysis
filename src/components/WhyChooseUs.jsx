
const strengths = [
  {
    number: "01",
    title: "Dignity Comes First",
    copy: "Every patient and family deserves kindness, privacy, and respect throughout their care journey.",
    icon: (
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
    ),
  },
  {
    number: "02",
    title: "Care With Purpose",
    copy: "A trust-led mission focused on improving access to dialysis care for people who need support.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 3v18M3 12h18" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Clear Patient Guidance",
    copy: "We encourage patients to ask questions and contact the centre to plan their next steps.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "A Welcoming Facility",
    copy: "A care environment focused on dialysis treatment, patient comfort, and respectful support.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </svg>
    ),
  },
];

const careSteps = [
  {
    number: "01",
    title: "Apply For Support",
    description:
      "Contact the centre to enquire about free dialysis support and start the application process.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Document Verification",
    description:
      "Share the required documents so the centre's team can review your details and eligibility.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get Your Appointment",
    description:
      "After the necessary checks, the centre will guide you on appointment confirmation and your visit.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Receive Free Dialysis",
    description:
      "Eligible patients can begin free dialysis care as confirmed by the centre after verification.",
    icon: (
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
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <div
      className="text-primary-navy"
    >
      {/* WHY CHOOSE US SECTION */}
      <section
        aria-labelledby="why-title"
        className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/40 blur-3xl"
        />

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14">
            {/* Left Content */}
            <div className="lg:sticky lg:top-36">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-teal bg-background-blue px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-teal">
                <span className="h-2 w-2 rounded-full bg-primary-teal" />
                Why Choose Us
              </div>

              <h2
                id="why-title"
                className="text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
              >
                Care That Sees The Person,{" "}
                <span className="text-primary-teal">
                  Not Just The Treatment.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                Dialysis can affect daily routines, family
                responsibilities, finances, and peace of mind.
                Our aim is to make every interaction respectful,
                supportive, and clear.
              </p>

              <a
                href="/contact"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-primary-teal px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
              >
                Speak With Our Team
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Strength Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {strengths.map((item) => (
                <article
                  key={item.number}
                  className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-background-blue p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:bg-white hover:shadow-[0_18px_40px_rgba(21,60,91,0.08)] sm:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-navy to-primary-teal opacity-0 transition-opacity group-hover:opacity-100"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal transition-colors group-hover:bg-primary-teal group-hover:text-white">
                      {item.icon}
                    </div>

                    <span className="text-xs font-bold tracking-[0.15em] text-text-secondary">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold leading-snug text-primary-navy sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        aria-labelledby="care-process-title"
        className="relative isolate overflow-hidden bg-background-blue py-16 sm:py-20 lg:py-24"
      >
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="absolute -right-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/50 blur-3xl"
        />

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
          {/* Process Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-teal bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-teal">
              <span className="h-2 w-2 rounded-full bg-primary-teal" />
              Your Care Journey
            </div>

            <h2
              id="care-process-title"
              className="text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
            >
              How It <span className="text-primary-teal">Works</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Getting started should feel simple. Follow these
              steps to understand how to enquire about free
              dialysis support at our centre.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
          </div>

          {/* Four Steps */}
          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {/* Connector Line: Desktop */}
            <div
              aria-hidden="true"
              className="absolute left-[12%] right-[12%] top-9 hidden h-[2px] bg-surface-teal lg:block"
            />

            {careSteps.map((step) => (
              <article
                key={step.number}
                className="group relative rounded-3xl border border-border-subtle bg-white p-6 shadow-[0_8px_30px_rgba(21,60,91,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.09)] sm:p-7"
              >
                {/* Step Icon */}
                <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-background-blue bg-surface-teal text-primary-teal transition-colors duration-300 group-hover:bg-primary-teal group-hover:text-white">
                  {step.icon}
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
                  Step {step.number}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-snug text-primary-navy">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          {/* Process CTA */}
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-border-subtle bg-white p-6 shadow-sm sm:flex-row sm:p-8 lg:mt-12">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-primary-navy sm:text-2xl">
                Need Help Getting Started?
              </h3>

              <p className="mt-2 text-sm leading-7 text-text-secondary">
                Contact Our Team To Learn About The Application
                Process, Required Documents, And Eligibility.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-primary-teal px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
            >
              Contact The Centre
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
