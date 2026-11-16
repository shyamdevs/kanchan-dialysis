import campaignImage from "../assets/qr.jpeg";

const CAMPAIGN_CONTACTS = ["+91 70233 33489", "+91 99280 86643"];

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function OneDayCampaign() {
  return (
    <section
      aria-labelledby="one-day-campaign-title"
      className="mt-10 overflow-hidden rounded-[2rem] border border-border-subtle bg-white shadow-[0_18px_55px_rgba(21,60,91,0.07)] sm:mt-0"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* Campaign information */}
        <div className="relative isolate overflow-hidden bg-background-blue p-6 sm:p-9 lg:p-10 xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full border border-primary-teal/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-surface-teal/60 blur-2xl"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-primary-teal/20 bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-navy">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Special-Day Giving Campaign
          </span>

          <h3
            id="one-day-campaign-title"
            className="mt-5 font-sans text-3xl font-bold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-[2.65rem]"
          >
            Make Your Special Day{" "}
            <span className="text-primary-teal">Meaningful.</span>
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Celebrate your birthday, anniversary, or another important day
            by joining the One Day Campaign and supporting the Trust&apos;s
            dialysis-care mission.
          </p>

          <div className="mt-6 rounded-2xl border border-border-subtle bg-white p-5 shadow-[0_8px_25px_rgba(21,60,91,0.05)] sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
              Suggested Campaign Contribution
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-extrabold tracking-tight text-primary-navy sm:text-5xl">
                ₹11,000
              </span>
              <span className="text-sm font-medium text-text-secondary">
                for one special day
              </span>
            </div>

            <div className="mt-4 h-px bg-border-subtle" />

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              Dedicate a date that matters to you and help the Trust continue
              its work supporting people in need.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Birthday", "Anniversary", "Special Occasion"].map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-border-subtle bg-white/80 px-3 py-1.5 text-xs font-semibold text-primary-navy"
              >
                {occasion}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/donate"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
            >
              View Donation Options
              <ArrowIcon />
            </a>

            <a
              href="tel:+917023333489"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary-navy/20 bg-white px-5 py-3 text-sm font-bold text-primary-navy transition hover:border-primary-teal hover:bg-background-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
            >
              Call Campaign Team
            </a>
          </div>

          <p className="mt-5 text-xs leading-6 text-text-secondary">
            Campaign enquiries: {CAMPAIGN_CONTACTS.join(" · ")}
          </p>
        </div>

        {/* Campaign poster */}
        <div className="flex flex-col items-center justify-center border-t border-border-subtle bg-background-blue p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="mb-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
              One Day Campaign
            </p>

            <p className="mt-2 font-sans text-xl font-bold text-primary-navy sm:text-2xl">
              Block Your Special Date
            </p>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Celebrate a special moment through seva.
            </p>
          </div>

          <div className="w-full max-w-[390px] rounded-2xl border border-border-subtle bg-white p-2 shadow-[0_16px_40px_rgba(21,60,91,0.10)] sm:p-3">
            <img
              src={campaignImage}
              alt="Shri Kanchan Dialysis Centre One Day Campaign poster"
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[680px] w-full rounded-xl object-contain"
            />
          </div>

          <p className="mt-4 max-w-sm text-center text-xs leading-6 text-text-secondary">
            Please contact the Trust to confirm your preferred date and
            contribution details before donating.
          </p>
        </div>
      </div>
    </section>
  );
}