export default function PatientCTASection({ clinic }) {
  return (
    <section className="relative isolate overflow-hidden py-12 sm:py-16">
      <img
        src={clinic}
        alt="Dialysis treatment area"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-primary-navy/90" />
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-white sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Questions before your visit?
          </h2>
          <p className="mt-2 leading-7 text-background-blue">
            Call the centre so the team can advise you about practical next steps.
          </p>
        </div>
        <a
          href="tel:+918005770633"
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 font-extrabold text-primary-navy hover:bg-neutral-background"
        >
          Call +91 80057 70633
        </a>
      </div>
    </section>
  );
}
