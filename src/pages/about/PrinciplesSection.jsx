import { principles } from "./aboutData";
import SectionHeading from "./SectionHeading";

export default function PrinciplesSection({ onSelectPrinciple }) {
  return (
      <section className="bg-background-blue py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="What guides us"
            title="The principles behind our work"
            description="A people-first approach to care, communication, and community service."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            {principles.map((item, index) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_8px_28px_rgba(21,60,91,0.04)] transition duration-300 hover:-translate-y-1 hover:border-surface-teal hover:shadow-[0_18px_40px_rgba(21,60,91,0.09)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-teal to-secondary-cyan opacity-80" />
                <button
                  type="button"
                  onClick={() => onSelectPrinciple(item)}
                  aria-haspopup="dialog"
                  aria-label={`Read more about ${item.title}`}
                  className="block w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-teal sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-teal text-2xl font-bold text-primary-navy transition group-hover:bg-primary-teal group-hover:text-white" aria-hidden="true">
                      {item.mark}
                    </span>
                    <span className="pt-1 text-xs font-extrabold tracking-[0.18em] text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold tracking-tight text-primary-navy sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                    {item.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary-teal">
                    Read more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}
