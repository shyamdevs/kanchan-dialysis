import { facilityPhotos, preparationChecklist } from "./servicesData";

export default function FacilitySection() {
  return (
    <section className="bg-neutral-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              Our facility
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl">
              A calm, organised setting for care.
            </h2>
            <p className="mt-5 leading-8 text-text-secondary">
              The photos below provide a visual introduction to the centre. For
              current equipment, operating hours, accessibility, or
              treatment-related questions, please confirm details with the care
              team directly.
            </p>

            <ul className="mt-6 space-y-3">
              {preparationChecklist.map((line) => (
                <li key={line} className="flex items-start gap-3 text-text-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background-blue text-sm font-black text-primary-navy"
                  >
                    ✓
                  </span>
                  <span className="leading-7">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 font-extrabold text-primary-navy transition hover:text-primary-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
            >
              Plan a visit <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {facilityPhotos.map((photo, index) => (
              <figure
                key={photo.label}
                className={`overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-md ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover ${
                    index === 0 ? "h-64 sm:h-80" : "h-40 sm:h-52"
                  }`}
                />
                <figcaption className="px-4 py-3 text-sm font-bold text-text-secondary">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
