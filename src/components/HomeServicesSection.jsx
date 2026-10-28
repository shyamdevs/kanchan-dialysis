const services = [
  {
    number: "01",
    title: "Dialysis Care",
    description:
      "Learn about dialysis care at our centre and contact our team to discuss treatment arrangements and your next steps.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5W3CkYKFNrreT30rEFqLMt88LxYp4F9s_ZoH_C9zecELsSwV_xD2x_37G&s=10",
    alt: "Dialysis machine in a medical setting",
    label: "Our Core Service",
  },
  {
    number: "02",
    title: "Patient & Family Guidance",
    description:
      "Get clear information to help patients and families understand the care journey and prepare for their visit.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSAYSThJ5KcCzlugmgoY7Dkx6Ij-SZNY1HK0roNYuYA&s=10",
    alt: "Healthcare professionals in a clinical setting",
    label: "Patient Support",
  },
  {
    number: "03",
    title: "Appointment Assistance",
    description:
      "Speak with our team about appointment arrangements, required documents, and the next steps.",
    image:
      "https://images.prismic.io/cls-health/aaW2qDPJ2QKSVUBx_AdobeStock_867731678.webp?auto=format,compress&rect=0,499,7012,3681&w=2400&h=1260",
    alt: "Medical professional in a healthcare setting",
    label: "Getting Started",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function HomeServicesSection() {
  return (
    <section
      aria-labelledby="home-services-title"
      className="bg-background-blue px-5 py-16 font-sans sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Heading */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-teal sm:text-sm">
              <span className="h-[2px] w-7 bg-primary-teal" />
              Our Services
            </span>

            <h2
              id="home-services-title"
              className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
            >
              Care That Puts{" "}
              <span className="text-primary-teal">People First.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-1">
            <p className="text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Discover our approach to dialysis care, patient guidance, and
              support with the next steps at Shri Kanchan Dialysis Centre.
            </p>

            <a
              href="/services"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-navy transition-colors hover:text-primary-teal"
            >
              Explore All Services
              <ArrowIcon />
            </a>
          </div>




        </div>

        {/* Responsive Service Cards */}
        <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-[0_6px_25px_rgba(21,60,91,0.06)] transition duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.12)]"
            >
              {/* Image: full image visible, no cropping */}
              <div className="group/image relative isolate aspect-[4/3] w-full overflow-hidden bg-background-blue">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                />

                {/* Desktop hover overlay only */}
                <div className="absolute inset-0 hidden bg-gradient-to-t from-primary-navy-dark/95 via-primary-navy/70 to-primary-navy/15 opacity-0 transition-opacity duration-300 sm:block sm:group-hover/image:opacity-100 sm:group-focus-within/image:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 hidden flex-col items-start p-5 pt-16 transition-all duration-300 sm:flex sm:translate-y-2 sm:opacity-0 sm:group-hover/image:translate-y-0 sm:group-hover/image:opacity-100 sm:group-focus-within/image:translate-y-0 sm:group-focus-within/image:opacity-100 lg:p-6">
                  <span className="rounded-full border border-white/25 bg-primary-navy/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-cyan backdrop-blur-sm sm:text-xs">
                    {service.label}
                  </span>

                  <h3 className="mt-2 text-xl font-bold leading-snug text-white">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-white/90">
                    {service.description}
                  </p>

                  <a
                    href="/contact"
                    className="group/overlay mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-bold text-primary-navy transition hover:bg-secondary-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              {/* Mobile card content: text appears below the image */}
              <div className="flex flex-1 flex-col p-5 sm:hidden">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-background-blue px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary-teal">
                    {service.label}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-text-secondary">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-snug text-primary-navy">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {service.description}
                </p>

                <a
                  href="/contact"
                  className="group/link mt-4 inline-flex min-h-10 items-center gap-2 self-start text-sm font-bold text-primary-teal transition-colors hover:text-primary-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Call To Action */}
        {/* <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-primary-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mt-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-cyan">
              Need More Information?
            </p>

            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
              We Are Here To Guide You.
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/75">
              Contact our team to discuss your questions and understand the next
              steps.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href="/services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View All Services
              <ArrowIcon />
            </a>

            <a
              href="tel:+918005770633"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-secondary-cyan px-5 py-3 text-sm font-bold text-primary-navy transition hover:bg-white"
            >
              Call The Centre
            </a>
          </div>
        </div> */}
{/* 
        <p className="mt-5 text-center text-xs leading-5 text-text-secondary">
          Images are illustrative and may not show the actual centre or staff.
        </p> */}
      </div>
    </section>
  );
}
