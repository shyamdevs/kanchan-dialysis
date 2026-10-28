import { entrance } from "./servicesData";

export default function ServicesCTASection() {
  return (
    <section className="relative isolate overflow-hidden py-14">
      <img
        src={entrance}
        alt="Entrance of Shri Kanchan Dialysis Centre"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-primary-navy/90" aria-hidden="true" />

      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-white sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Need information before coming in?
          </h2>
          <p className="mt-2 leading-7 text-background-blue">
            The care team can help with practical questions about the centre and
            your visit.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-extrabold text-primary-navy transition hover:bg-neutral-background focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-navy"
        >
          Contact the centre <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
