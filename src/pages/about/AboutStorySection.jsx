import { treatmentImage } from "./aboutData";

export default function AboutStorySection() {
  return (
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full bg-background-blue/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-10">
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-[2rem] border-l-2 border-t-2 border-primary-teal/40 sm:-left-4 sm:-top-4 sm:h-32 sm:w-32" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border-subtle bg-neutral-background p-2 shadow-[0_24px_70px_rgba(21,60,91,0.13)] sm:rounded-[2rem] sm:p-3">
              <img
                src={treatmentImage}
                alt="A patient receiving dialysis treatment at the centre"
                className="h-[320px] w-full rounded-[1.25rem] object-cover object-center sm:h-[440px] sm:rounded-[1.5rem] lg:h-[510px]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-teal sm:text-xs">
                  Rooted in seva
                </p>
                <p className="mt-1 text-base font-extrabold leading-snug text-primary-navy sm:text-xl">
                  Care, clear guidance, and respect for every person.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 -z-0 h-20 w-20 rounded-full border-[12px] border-surface-teal/80 sm:-right-5 sm:h-28 sm:w-28 sm:border-[16px]" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-surface-teal bg-background-blue px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary-teal sm:text-sm">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary-teal" />
              Our Story
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-primary-navy sm:text-4xl lg:text-5xl">
              Care Should Never Make A Person Feel Alone.
            </h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-primary-teal" />
            <p className="mt-6 text-base leading-8 text-text-secondary">
              Shri Kanchan Dialysis Centre is a unit of Shri Krishan Kanchan
              Sewa Trust. The centre’s mission is rooted in service—helping
              people facing kidney-related treatment needs find clear
              information, a welcoming environment, and practical support.
            </p>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              Living with a long-term condition can place pressure on patients
              and caregivers. We want every interaction with the centre to feel
              respectful: questions are welcome, next steps should be explained
              clearly, and each patient should be treated as a person rather
              than a number.
            </p>
            <p className="mt-4 text-base leading-8 text-text-secondary">
              Our work continues through the support of the people and community
              who stand behind this mission. For details about treatment,
              eligibility, or a visit, please speak directly with the centre’s
              team.
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-border-subtle bg-neutral-background/80 p-4 sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-teal text-xl font-bold text-white shadow-sm shadow-primary-teal/20" aria-hidden="true">
                ✓
              </span>
              <div>
                <p className="text-xs font-semibold text-text-secondary">Operated under</p>
                <p className="mt-0.5 text-sm font-extrabold text-primary-navy sm:text-base">
                  Shri Krishan Kanchan Sewa Trust
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-primary-teal/15 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
              >
                Contact the centre <span aria-hidden="true">→</span>
              </a>
              <a
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-white px-6 py-3 text-sm font-extrabold text-primary-navy transition hover:border-primary-teal hover:bg-background-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
              >
                Explore services
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}
