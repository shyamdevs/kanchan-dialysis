import { milestones } from "./aboutData";
import SectionHeading from "./SectionHeading";

export default function JourneySection() {
  return (
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Our journey"
            title="A Continuing Commitment To Seva"
            description="A short timeline adapted from the supplied website story. Please confirm historic figures and specific milestones with the trust before public launch."
            align="center"
          />

          <div className="relative mx-auto mt-10 max-w-4xl sm:mt-14">
            <div className="absolute bottom-8 left-6 top-8 w-px bg-surface-teal sm:left-8" aria-hidden="true" />
            <div className="space-y-4 sm:space-y-5">
              {milestones.map((item, index) => (
                <article
                  key={item.year}
                  className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[4.25rem_minmax(0,1fr)] sm:gap-5"
                >
                  <span className="z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-surface-teal bg-white text-xs font-extrabold text-primary-navy shadow-[0_4px_14px_rgba(21,60,91,0.07)] sm:h-16 sm:w-16 sm:text-sm">
                    {item.year}
                  </span>
                  <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-[0_6px_22px_rgba(21,60,91,0.035)] transition hover:border-surface-teal hover:shadow-sm sm:p-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-teal sm:text-xs">
                      Milestone {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-7 text-text-secondary sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}
