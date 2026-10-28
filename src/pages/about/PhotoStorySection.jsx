import { moments } from "./aboutData";
import SectionHeading from "./SectionHeading";

export default function PhotoStorySection() {
  return (
<section className="bg-[#F3F8FA] py-16 sm:py-20 lg:py-24">
  <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
    <SectionHeading
      eyebrow="Our work in view"
      title="The place, the care, the community"
      description="Discover our centre, the care environment, and the people behind our community mission."
      align="center"
    />

    <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {moments.map((moment) => (
        <article
          key={moment.title}
          className="group overflow-hidden rounded-2xl border border-[#E3EBEF] bg-white shadow-[0_8px_28px_rgba(21,60,91,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(21,60,91,0.12)]"
        >
          {/* Uniform image frame for every story */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E2F1F3]">
            <img
              src={moment.image}
              alt={moment.alt}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover ${
                moment.imagePosition || "object-center"
              } transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
            />

            {/* Subtle edge contrast, keeping the photo clear */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#153C5B]/[0.06]" />

            {moment.eyebrow && (
              <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#153C5B] shadow-sm sm:left-5 sm:top-5">
                {moment.eyebrow}
              </span>
            )}
          </div>

          {/* Clean content area below the photograph */}
          <div className="p-5 sm:p-6">
            <h3 className="text-xl font-bold leading-snug text-[#153C5B] transition-colors duration-300 group-hover:text-[#0798A5]">
              {moment.title}
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-[#0798A5] transition-all duration-300 group-hover:w-14" />

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm leading-6 text-[#64748B]">
                Shri Kanchan Dialysis Centre
              </p>

              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E3EBEF] text-lg text-[#0798A5] transition-colors duration-300 group-hover:border-[#0798A5] group-hover:bg-[#0798A5] group-hover:text-white"
              >
                ↗
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
  );
}
