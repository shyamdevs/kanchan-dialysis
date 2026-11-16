export default function VideoCarouselHeader() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
      <div className="max-w-[640px]">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary sm:text-xs sm:tracking-[0.18em]">
          <span className="h-[2px] w-10 shrink-0 bg-primary-teal sm:w-14" />
          <span>Glimpses of Care · Jaipur</span>
        </div>
        <h2
          id="video-gallery-heading"
          className="mt-4 text-[1.9rem] font-extrabold leading-[1.15] tracking-[-0.035em] text-primary-navy sm:text-4xl lg:text-[2.9rem]"
        >
          Inside <span className="text-primary-teal">Our Centre</span>
        </h2>
        <p className="mt-3 max-w-[560px] text-sm leading-7 text-text-secondary sm:text-base">
          A quiet look at the space where every dialysis session becomes a step toward hope and healing.
        </p>
      </div>

      <a
        href="/patients"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary-navy bg-white/70 px-6 py-3 text-sm font-bold text-primary-navy transition hover:border-primary-teal hover:bg-white hover:text-primary-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:text-base"
      >
        View More
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}