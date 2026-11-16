
import trustee1 from "../assets/trustee1.jpeg";
import trustee2 from "../assets/trustee2.jpeg";
import trustee3 from "../assets/trustee3.jpeg";

const TRUSTEES = [
  {
    name: "Bhuvnesh Sharma",
   
    image: trustee1,
  },
  {
    name: "Rashmi Mathur",
   
    image: trustee2,
  },
  {
    name: "Dr Piyush Mathur",
   
    image: trustee3,
  },
];

export default function TrusteeSection() {
  return (
    <section
      aria-labelledby="trustees-heading"
      className="relative isolate overflow-hidden bg-background-blue py-16 sm:py-20 lg:py-24"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-surface-teal/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-surface-teal/50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">

        {/* Section heading */}
        <div className="mb-12 max-w-2xl sm:mb-16">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-text-secondary sm:text-xs">
            <span className="h-[2px] w-10 bg-primary-teal sm:w-14" />
            Leadership & Governance
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <h2
              id="trustees-heading"
              className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-primary-navy sm:text-4xl lg:text-5xl"
            >
              Meet Our{" "}
              <span className="text-primary-teal">Trustees</span>
            </h2>

            <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Behind every step towards accessible and affordable
              kidney care is a commitment to compassion and service.
              Meet the people guiding our mission and vision.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-primary-teal" />
            <span className="h-1 w-3 rounded-full bg-primary-teal/30" />
            <span className="h-1 w-2 rounded-full bg-primary-teal/15" />
          </div>
        </div>

        {/* Trustee profiles */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {TRUSTEES.map((trustee, index) => (
            <article
              key={trustee.name}
              className="
                group relative flex h-full flex-col
                overflow-hidden rounded-[1.75rem]
                border border-white/90 bg-white
                shadow-[0_15px_45px_rgba(21,60,91,0.09)]
                transition-all duration-500
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(21,60,91,0.15)]
                sm:rounded-[2rem]
              "
            >
              {/* Portrait */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-surface-teal">

                <img
                  src={trustee.image}
                  alt={`Portrait of ${trustee.name}`}
                  loading="lazy"
                  decoding="async"
                  className="
                    absolute inset-0 h-full w-full
                    object-cover object-top
                    transition-transform duration-700
                    ease-out group-hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-primary-navy/55
                    via-transparent to-transparent
                    opacity-70
                    transition-opacity duration-500
                    group-hover:opacity-90
                  "
                />

                {/* Trustee number */}
                <div className="
                  absolute left-5 top-5
                  flex items-center gap-2
                  rounded-full border border-white/30
                  bg-primary-navy/35 px-3.5 py-2
                  text-[10px] font-bold tracking-[0.16em]
                  text-white backdrop-blur-md
                ">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  TRUSTEE {String(index + 1).padStart(2, "0")}
                </div>

                {/* Bottom image accent */}
                <div className="
                  absolute bottom-0 left-0 h-1 w-full
                  origin-left scale-x-0
                  bg-primary-teal
                  transition-transform duration-500
                  group-hover:scale-x-100
                " />
              </div>

              {/* Trustee information */}
              <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7 sm:pb-8">

                <div className="mb-4 flex items-center gap-2">
                  <span className="h-[2px] w-7 rounded-full bg-primary-teal" />
                  <span className="
                    text-[10px] font-bold uppercase
                    tracking-[0.17em] text-primary-teal
                  ">
                    Our Leadership
                  </span>
                </div>

                <h3 className="
                  text-xl font-extrabold leading-snug
                  tracking-[-0.025em] text-primary-navy
                  transition-colors duration-300
                  group-hover:text-primary-teal
                  sm:text-[1.35rem]
                ">
                  {trustee.name}
                </h3>

                <p className="
                  mt-2 text-xs font-semibold uppercase
                  leading-6 tracking-[0.12em]
                  text-text-secondary sm:text-[13px]
                ">
                  {trustee.role}
                </p>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-border-subtle" />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="
                      text-[10px] font-bold uppercase
                      tracking-[0.15em] text-text-secondary
                    ">
                      Shri Krishan Kanchan Sewa Trust
                    </span>

                    <span className="
                      flex h-8 w-8 items-center justify-center
                      rounded-full bg-surface-teal
                      text-primary-teal
                      transition-all duration-300
                      group-hover:bg-primary-teal
                      group-hover:text-white
                    ">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 17 17 7M7 7h10v10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>

        {/* Bottom message */}
        <div className="
          mt-12 flex flex-col items-center
          justify-center gap-3 text-center
          sm:mt-16
        ">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-primary-teal/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-teal">
              Together in Service
            </span>
            <span className="h-px w-8 bg-primary-teal/40" />
          </div>

          <p className="
            max-w-lg text-sm leading-7
            text-text-secondary
          ">
            Working together towards a future where quality
            kidney care is accessible to everyone.
          </p>
        </div>

      </div>
    </section>
  );
}
