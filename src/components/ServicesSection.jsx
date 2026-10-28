
const services = [
  {
    title: "Dialysis Care",
    description:
      "Explore dialysis care at our centre and learn about the treatment arrangements available to patients.",
    image:
      "https://images.unsplash.com/photo-1742436598939-f5cd30ba7827?auto=format&fit=crop&w=1000&q=80",
    alt: "Dialysis equipment in a healthcare setting",
  },
  {
    title: "Patient Guidance",
    description:
      "Get clear information about the care journey, required documents, and the next steps for patients.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    alt: "Healthcare professional providing patient guidance",
  },
  {
    title: "Appointment Assistance",
    description:
      "Contact our team to ask about appointment arrangements and the process for receiving care.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
    alt: "Medical professional in a clinical setting",
  },
];

export default function HomeServicesSection() {
  return (
    <section
      aria-labelledby="home-services-title"
      className="bg-white px-5 py-16 font-sans sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-teal bg-background-blue px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary-teal sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Our Services
          </span>

          <h2
            id="home-services-title"
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl"
          >
            Care And Support,{" "}
            <span className="text-primary-teal">Every Step Of The Way.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Discover our approach to dialysis care, patient guidance, and
            assistance with the next steps at Shri Kanchan Dialysis Centre.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-3xl border border-border-subtle bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_45px_rgba(21,60,91,0.12)]"
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/65 via-transparent to-transparent" />

                <span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-bold text-primary-navy">
                  Service 0{index + 1}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold text-primary-navy sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {service.description}
                </p>

                <a
                  href="/contact"
                  className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-primary-teal transition-colors hover:text-primary-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
                >
                  Enquire Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Services */}
        <div className="mt-10 flex justify-center lg:mt-12">
          <a
            href="/services"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary-navy px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
          >
            View All Services
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
