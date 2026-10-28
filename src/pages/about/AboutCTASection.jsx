export default function AboutCTASection() {
  return (
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary-navy px-6 py-9 shadow-[0_20px_55px_rgba(21,60,91,0.18)] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-14">
          <div aria-hidden="true" className="absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border-[36px] border-white/5" />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-primary-navy via-primary-navy to-primary-teal/80" />
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-secondary-cyan">Need more information?</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Speak with the centre’s team.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Contact us with questions about services, visit preparation, or the next steps for your circumstances.
            </p>
          </div>
          <div className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-primary-navy transition hover:bg-background-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-navy"
            >
              Contact us <span aria-hidden="true">→</span>
            </a>
            <a
              href="/gallery"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-navy"
            >
              View gallery
            </a>
          </div>
        </div>
      </section>
  );
}
