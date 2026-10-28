import { resources } from './patientsData.js';

export default function PatientGuideSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
            Patient and family guide
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary-navy sm:text-4xl">
            Know what to bring and what to ask.
          </h2>
          <p className="mt-4 leading-7 text-text-secondary">
            This information helps with visit planning and is not medical advice. Your clinical team can guide you based on your individual needs.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.number}
              className="rounded-2xl border border-border-subtle bg-neutral-background p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-[0.2em] text-primary-teal">
                  {resource.number}
                </span>
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-background-blue font-bold text-primary-navy">
                  ✓
                </span>
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-primary-navy">
                {resource.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {resource.description}
              </p>
              <ul className="mt-4 space-y-2">
                {resource.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text-secondary">
                    <span aria-hidden="true" className="mt-1 text-primary-teal">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
