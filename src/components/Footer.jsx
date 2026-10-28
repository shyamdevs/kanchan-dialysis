
import logo from "../assets/logo.jpeg";

const links = [
  ["Home", "/"],
  ["About us", "/about"],
  ["Services", "/services"],
  ["Patients", "/patients"],
  ["Gallery", "/gallery"],
  ["News & Updates", "/news"],
  ["Get Involved", "/get-involved"],
  ["Donate", "/donate"],
  ["Contact", "/contact"],
];

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

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.1-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-background-blue text-primary-navy">
      {/* Decorative top accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-navy via-primary-teal to-secondary-cyan"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-surface-teal/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-12 lg:px-10 lg:py-16">
        {/* Brand and mission */}
        <div>
          <a
            href="/"
            aria-label="Shri Kanchan Dialysis home"
            className="inline-flex max-w-full items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal sm:gap-4"
          >
            <span className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-[3px] border-primary-teal bg-white p-0.5 shadow-sm sm:h-[72px] sm:w-[72px]">
              <img
                src={logo}
                alt="Shri Kanchan Dialysis logo"
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            </span>

            <span className="min-w-0">
              <strong className="block text-base font-extrabold leading-tight tracking-tight text-primary-navy sm:text-xl">
                Shri Kanchan Dialysis
              </strong>

              <span className="mt-1.5 block text-xs font-semibold leading-5 text-text-secondary sm:text-sm">
                Shri Krishan Kanchan Sewa Trust
              </span>
            </span>
          </a>

          <p className="mt-5 max-w-md text-sm leading-7 text-text-secondary">
            A trust-led dialysis-care mission in Jaipur, built around
            dignity, patient support, and compassionate service.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5 hover:bg-primary-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
          >
            Get in Touch
            <ArrowIcon />
          </a>
        </div>

        {/* Explore navigation */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-primary-navy">
            <span className="h-5 w-1 rounded-full bg-primary-teal" />
            Explore
          </h2>

          <nav
            aria-label="Footer navigation"
            className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm"
          >
            {links.map(([label, path]) => (
              <a
                href={path}
                key={path}
                className={
                  path === "/donate"
                    ? "inline-flex w-fit items-center gap-1.5 font-bold text-primary-teal transition hover:text-primary-navy"
                    : "inline-flex items-center gap-1.5 text-text-secondary transition hover:text-primary-teal"
                }
              >
                {label}
                {path === "/donate" ? (
                  <ArrowIcon className="h-3.5 w-3.5" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="text-primary-teal/70"
                  >
                    ↗
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact information */}
        <div>
          <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-primary-navy">
            <span className="h-5 w-1 rounded-full bg-primary-teal" />
            Contact Us
          </h2>

          <address className="mt-5 space-y-5 text-sm not-italic leading-6 text-text-secondary">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-white text-primary-teal">
                <MapPinIcon />
              </span>

              <p className="pt-1">
                29, Janpath, near Dana Pani Restaurant,
                <br />
                Shyam Nagar, Sodala,
                <br />
                Jaipur, Rajasthan 302019
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-white text-primary-teal">
                <PhoneIcon />
              </span>

              <div className="space-y-2 pt-1">
                <a
                  className="block transition hover:text-primary-teal"
                  href="tel:+918005770633"
                >
                  +91 80057 70633
                </a>
                <a
                  className="block transition hover:text-primary-teal"
                  href="tel:+918005566014"
                >
                  +91 80055 66014
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-white text-primary-teal">
                <MailIcon />
              </span>

              <a
                className="break-all pt-1 transition hover:text-primary-teal"
                href="mailto:shrikrishankanchansewa@gmail.com"
              >
                shrikrishankanchansewa@gmail.com
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-border-subtle bg-white/70">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-5 text-xs leading-5 text-text-secondary sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>
            © {new Date().getFullYear()} Shri Kanchan Dialysis Centre.
            All rights reserved.
          </span>

          <span className="font-medium text-text-secondary">
            Shri Krishan Kanchan Sewa Trust · Jaipur, Rajasthan
          </span>
        </div>
      </div>
    </footer>
  );
}
