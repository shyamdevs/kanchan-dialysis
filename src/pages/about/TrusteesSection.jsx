import { teamPhoto, getTrusteeRole } from "./aboutData";
import SectionHeading from "./SectionHeading";

export default function TrusteesSection({ trustees, trusteeStatus, onSelectTrustee }) {
  return (
      <section className="bg-neutral-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Our people" title="Meet the trustees" />
            <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
              Select a trustee’s photo or name to read their published profile.
            </p>
          </div>

          {trusteeStatus === "loading" && (
            <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white p-5 text-sm text-text-secondary shadow-sm">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-surface-teal border-t-primary-teal" aria-hidden="true" />
              Loading trustee profiles…
            </div>
          )}

          {trusteeStatus === "error" && (
            <div role="status" className="rounded-2xl border border-surface-teal bg-white p-5 text-sm leading-7 text-primary-navy sm:p-6">
              Trustee profiles are temporarily unavailable. Please check back later.
            </div>
          )}

          {trusteeStatus === "ready" && trustees.length === 0 && (
            <div className="grid overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-[0_12px_36px_rgba(21,60,91,0.06)] lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="relative min-h-64 overflow-hidden bg-surface-teal sm:min-h-80 lg:min-h-[360px]">
                <img
                  src={teamPhoto}
                  alt="People standing together at Shri Kanchan Dialysis Centre"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-teal">Trustee directory</span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-primary-navy sm:text-3xl">
                  Profiles will appear here when published.
                </h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
                  Publish trustee profiles with a photo, title, role, and introduction in the admin panel to display them on this page.
                </p>
                <a
                  href="/admin"
                  className="mt-6 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
                >
                  Open admin panel <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          )}

          {trusteeStatus === "ready" && trustees.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trustees.map((person) => {
                const role = getTrusteeRole(person);
                return (
                  <article
                    key={person._id || person.slug || person.title}
                    className="group overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_6px_24px_rgba(21,60,91,0.045)] transition duration-300 hover:-translate-y-1 hover:border-surface-teal hover:shadow-[0_18px_40px_rgba(21,60,91,0.10)]"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectTrustee(person)}
                      className="group/button block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-teal"
                      aria-label={`View profile of ${person.title}, ${role}`}
                    >
                      <div className="relative aspect-[4/4.5] overflow-hidden bg-surface-teal">
                        <img
                          src={person.imageUrl}
                          alt={`${person.title} — ${role}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center transition duration-500 group-hover/button:scale-[1.035]"
                        />
                        <span className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary-navy shadow-sm backdrop-blur sm:text-xs">
                          {role}
                        </span>
                      </div>
                      <div className="p-5 sm:p-6">
                        <h3 className="text-lg font-extrabold leading-snug text-primary-navy transition group-hover/button:text-primary-teal">
                          {person.title}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary-teal">
                          View profile <span aria-hidden="true" className="transition-transform group-hover/button:translate-x-1">→</span>
                        </span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
  );
}
