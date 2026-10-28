
import { useState } from "react";
import qrCode from "../assets/qr.jpeg";
import campaignImage from "../assets/qr.jpeg";

const BANK_DETAILS = [
  { label: "Account Name", value: "Shri Krishan Kanchan Sewa Trust" },
  { label: "Bank & Branch", value: "HDFC Bank Ltd, Jaipur, Rajasthan" },
  { label: "Account Number", value: "50200058222032" },
  { label: "IFSC Code", value: "HDFC0001377" },
];

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

function CopyIcon({ className = "h-4 w-4" }) {
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
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }) {
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
      <path d="M12 3 21 7v5c0 5-3.5 8-9 9-5.5-1-9-4-9-9V7l9-4Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function BankIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9h18L12 3 3 9Z" />
      <path d="M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M2 18h20" />
    </svg>
  );
}

function UpiIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zm4 4h3v3h-3zm0-4h3m-7 4v3" />
    </svg>
  );
}

export default function BankTransfer() {
  const [copied, setCopied] = useState("");

  async function copy(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  return (
    <section
      id="bank-transfer"
      className="relative isolate overflow-hidden bg-background-blue px-5 py-16 font-sans sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-72 w-72 rounded-full bg-surface-teal/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-24 -z-10 h-80 w-80 rounded-full bg-surface-teal/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Introduction */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-teal/20 bg-surface-teal px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-navy sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-primary-teal" />
            Support the Mission
          </span>

          <h2 className="mt-5 font-sans text-3xl font-bold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-5xl">
            Your Support Can{" "}
            <span className="text-primary-teal">Make a Difference</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Your contribution can help support the Trust&apos;s mission and
            its work. Choose a convenient payment method and carefully verify
            the beneficiary details before making a transfer.
          </p>
 
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
        </div>

      
{/* One Day Campaign */}
<section
  aria-labelledby="one-day-campaign-title"
  className="mt-10 overflow-hidden rounded-[2rem] border border-border-subtle bg-white shadow-[0_18px_55px_rgba(21,60,91,0.07)] sm:mt-12"
>
  <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
    {/* Campaign information */}
    <div className="relative isolate overflow-hidden bg-background-blue p-6 sm:p-9 lg:p-10 xl:p-12">
      {/* Soft decorative accents */}
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

      {/* Contribution card */}
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

      {/* Occasion tags */}
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

      {/* Actions */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="#donation-options"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
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


        {/* Donation methods */}
        <div
          id="donation-options"
          className="mt-10 grid scroll-mt-28 items-stretch gap-7 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Bank Transfer Card */}
          <div className="overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-[0_12px_40px_rgba(21,60,91,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(21,60,91,0.10)]">
            {/* Bank card header */}
            <div className="bg-primary-navy px-6 py-6 text-white sm:px-8 sm:py-7">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-secondary-cyan">
                  <BankIcon />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-cyan">
                    Direct Bank Transfer
                  </p>
                  <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                    Trust Account Details
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/75">
                Use NEFT, RTGS or IMPS through your banking application.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["NEFT", "RTGS", "IMPS"].map((method) => (
                  <span
                    key={method}
                    className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Bank account details */}
            <div className="px-5 py-2 sm:px-8">
              {BANK_DETAILS.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between ${
                    index !== BANK_DETAILS.length - 1
                      ? "border-b border-border-subtle"
                      : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      {item.label}
                    </p>
                    <p className="mt-1.5 break-words text-sm font-semibold leading-6 text-primary-navy sm:text-base">
                      {item.value}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => copy(item.value, item.label)}
                    aria-label={`Copy ${item.label}`}
                    className={`inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:w-auto ${
                      copied === item.label
                        ? "border-primary-teal bg-surface-teal text-primary-navy"
                        : "border-border-subtle bg-white text-primary-navy hover:border-primary-teal hover:bg-background-blue"
                    }`}
                  >
                    {copied === item.label ? (
                      <>
                        <CheckIcon />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              ))}

              {/* Verification notice */}
              <div className="mb-5 mt-3 flex items-start gap-3 rounded-2xl border border-border-subtle bg-background-blue p-4 sm:mb-7">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-teal"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5m0-8h.01" />
                </svg>

                <p className="text-xs leading-6 text-text-secondary sm:text-sm">
                  Please verify the account details directly with the
                  Trust before transferring funds. Confirm any applicable
                  tax receipt or exemption eligibility with the organisation.
                </p>
              </div>
            </div>
          </div>

          {/* UPI QR Card */}
          <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-border-subtle bg-white p-6 text-center shadow-[0_12px_40px_rgba(21,60,91,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(21,60,91,0.10)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-teal via-secondary-cyan to-primary-navy"
            />

            <div className="mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-teal text-primary-teal">
              <UpiIcon />
            </div>

            <span className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary-teal">
              Quick and Convenient
            </span>

            <h3 className="mt-2 font-sans text-2xl font-bold leading-tight text-primary-navy sm:text-3xl">
              Contribute Through UPI
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-7 text-text-secondary">
              Scan the QR code with your UPI app and verify the beneficiary
              name before confirming the payment.
            </p>

            {/* QR code frame */}
            <div className="mt-6 w-full max-w-[310px] rounded-3xl border border-border-subtle bg-background-blue p-3 sm:p-4">
              <div className="rounded-2xl border border-border-subtle bg-white p-3">
                <img
                  src={qrCode}
                  alt="UPI payment QR code for Shri Krishan Kanchan Sewa Trust"
                  className="mx-auto aspect-square w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Payment verification notice */}
            <div className="mt-5 flex max-w-sm items-start gap-2.5 rounded-xl border border-border-subtle bg-background-blue p-3 text-left">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-teal" />
              <p className="text-xs leading-5 text-text-secondary">
                If the beneficiary name does not match the Trust, do not
                complete the payment.
              </p>
            </div>

            <a
              href="/contact"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition duration-300 hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:w-auto"
            >
              Ask a Donation Question
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Closing note */}
        <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-6 text-text-secondary sm:text-sm">
          Please make donations only after confirming the official payment
          details with Shri Krishan Kanchan Sewa Trust.
        </p>
      </div>
    </section>
  );
}
