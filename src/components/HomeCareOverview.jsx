
const resources = [
  {
    number: "01",
    title: "Free Dialysis Services",
    text: "Learn About The Centre, Treatment Environment, And How To Connect With Our Team.",
    path: "/services",
    action: "Explore Services",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 3v18M3 12h18" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Patient Resources",
    text: "Find Useful Visit-Planning Guidance And Information For Patients And Caregivers.",
    path: "/patients",
    action: "Prepare For A Visit",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Talk With Our Team",
    text: "Ask About The Next Steps, Documents To Bring, And Arranging A Visit.",
    path: "/contact",
    action: "Contact The Centre",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.1-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
];

export default function HomeCareOverview() {
  return (
    <section
      aria-labelledby="care-overview-title"
      className="relative isolate overflow-hidden bg-background-blue py-16 text-primary-navy sm:py-20 lg:py-24"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-surface-teal/40 blur-3xl"
      />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-teal bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-teal sm:tracking-[0.16em]">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            How We Can Help
          </div>

          <h2
            id="care-overview-title"
            className="text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
          >
            Care Starts With{" "}
            <span className="text-primary-teal">
              Clear Guidance.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Whether You Are Exploring Services, Preparing For A Visit,
            Or Looking For Ways To Support Our Mission, Start Here.
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
        </div>

        {/* Resource Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {resources.map((item) => (
            <article
              key={item.number}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-white p-6 shadow-[0_8px_30px_rgba(21,60,91,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.10)] sm:p-7"
            >
              {/* Card Accent */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-navy to-primary-teal"
              />

              {/* Icon And Number */}
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal transition-colors duration-300 group-hover:bg-primary-teal-dark group-hover:text-white">
                  {item.icon}
                </div>

                <span className="text-sm font-semibold tracking-[0.15em] text-text-secondary">
                  {item.number}
                </span>
              </div>

              {/* Card Content */}
              <h3 className="mt-6 text-xl font-bold leading-snug text-primary-navy sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-text-secondary">
                {item.text}
              </p>

              {/* Action Link */}
              <a
                href={item.path}
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary-teal transition-all duration-300 group-hover:gap-3 hover:text-primary-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
              >
                {item.action}

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
