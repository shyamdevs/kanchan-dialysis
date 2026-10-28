import { services } from "./servicesData";

export default function CoreServicesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              Our core services
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl">
              Support at each step of the care journey.
            </h2>
            <p className="mt-5 leading-8 text-text-secondary">
              Dialysis arrangements depend on each person’s clinical needs and
              the centre’s availability. Contact the team before travelling so
              they can confirm current services, eligibility, timing, and
              preparation requirements.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3.5 font-bold text-white shadow-md transition hover:bg-primary-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
            >
              Ask about services <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="rounded-2xl border border-border-subtle bg-neutral-background p-6 transition hover:border-surface-teal hover:bg-white hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-blue text-2xl font-bold text-primary-navy"
                >
                  {service.icon}
                </span>
                <p className="mt-5 text-xs font-extrabold tracking-widest text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-primary-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 rounded-xl border border-border-subtle bg-neutral-background px-4 py-3 text-sm leading-6 text-text-secondary">
          Please confirm current service availability, eligibility, fees, and
          clinical arrangements directly with the centre. Information on this
          page is general guidance and does not replace advice from a qualified
          healthcare professional.
        </p>
      </div>
    </section>
  );
}
