
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";

const NAV_ITEMS = [
  { label: "Home", path: "/" },

  { label: "Services", path: "/services" },
  { label: "Patients", path: "/patients" },
  { label: "Gallery", path: "/gallery" },
  { label: "News & Updates", path: "/news" },
    { label: "About Us", path: "/about" },
  { label: "Get Involved", path: "/get-involved" },
  { label: "Contact", path: "/contact" },
   
];

export default function Navbar({ currentPath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <header
      style={{ fontFamily: "'Poppins', sans-serif" }}
      className="sticky top-0 z-50 border-b border-[#E3EBEF] bg-white/95 shadow-[0_4px_18px_rgba(21,60,91,0.04)] backdrop-blur-xl"
    >
      {/* Top Contact Bar */}
      <div className="hidden border-b border-[#E8EEF1] bg-[#F0F6F8] lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 text-[13px] text-[#64748B] xl:px-10">
          <span>
            Compassionate Dialysis Care In Jaipur, Rajasthan
          </span>

          <div className="flex items-center gap-7">
            <a
              href="tel:+918005770633"
              className="inline-flex items-center gap-2 transition hover:text-[#0798A5]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-[#0798A5]"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.1-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              +91 80057 70633
            </a>

            <a
              href="mailto:shrikrishankanchansewa@gmail.com"
              className="inline-flex items-center gap-2 transition hover:text-[#0798A5]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 text-[#0798A5]"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              shrikrishankanchansewa@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex min-h-[72px] max-w-[1400px] items-center justify-between gap-2 px-3 py-3 sm:min-h-[88px] sm:gap-4 sm:px-6 lg:px-8 xl:min-h-[100px]">
        {/* Brand And Logo */}
        <a
          href="/"
          aria-label="Shri Kanchan Dialysis Home"
          className="flex min-w-0 shrink items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0798A5] sm:gap-3"
        >
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-[3px] border-[#F1B52D] bg-white p-[2px] shadow-sm sm:h-[62px] sm:w-[62px] xl:h-[72px] xl:w-[72px]">
            <img
              src={logo}
              alt="Shri Kanchan Dialysis Logo"
              className="h-full w-full rounded-full object-cover"
            />
          </span>

          <span className="min-w-0">
            <span className="block whitespace-nowrap text-[22px] font-extrabold leading-tight tracking-[-0.04em] text-[#153C5B] sm:text-xl lg:text-[22px] xl:text-2xl">
              Shri Kanchan Dialysis
            </span>

            <span className="mt-1 block whitespace-nowrap text-[11.5px] font-semibold leading-tight tracking-[-0.02em] text-[#64748B] sm:text-[10px] lg:text-xs xl:text-[13px]">
              A Unity Of Shri Krishan Kanchan Sewa Trust
            </span>
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            menuOpen
              ? "Close Navigation Menu"
              : "Open Navigation Menu"
          }
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DCE8ED] bg-white text-[#153C5B] transition hover:border-[#0798A5] hover:bg-[#F0F8FA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0798A5] xl:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <nav
          id="primary-navigation"
          aria-label="Primary Navigation"
          className={`${
            menuOpen
              ? "absolute inset-x-0 top-full block border-b border-[#E3EBEF] bg-white px-4 pb-5 pt-3 shadow-xl"
              : "hidden"
          } xl:static xl:ml-auto xl:block xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none`}
        >
          <div className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-0">
            {NAV_ITEMS.map((item) => {
              const active =
                currentPath === item.path ||
                (item.path !== "/" &&
                  currentPath.startsWith(`${item.path}/`));

              return (
                <a
                  key={item.path}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`relative rounded-lg px-3 py-3 text-sm font-medium transition after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-[#0798A5] after:transition-transform after:content-[''] xl:px-2 xl:text-[11px] 2xl:px-2.5 2xl:text-[13px] ${
                    active
                      ? "bg-[#F0F7F9] text-[#153C5B] after:scale-x-100"
                      : "text-[#34465A] after:scale-x-0 hover:bg-[#F0F7F9] hover:text-[#153C5B] hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Book Appointment Button */}
            <a
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0798A5] to-[#079DA8] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#0798A5]/15 transition hover:-translate-y-0.5 hover:from-[#087D8C] hover:to-[#0798A5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0798A5] xl:ml-2 xl:mt-0 xl:whitespace-nowrap xl:px-3 xl:text-[11px] 2xl:ml-3 2xl:px-4 2xl:text-[13px]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
              </svg>

              Donate Now
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Mobile Contact Details */}
          <div className="mt-4 flex flex-col gap-3 border-t border-[#E8EEF1] pt-4 text-sm text-[#64748B] xl:hidden">
            <a
              href="tel:+918005770633"
              className="transition hover:text-[#0798A5]"
            >
              +91 80057 70633
            </a>

            <a
              href="mailto:shrikrishankanchansewa@gmail.com"
              className="break-all transition hover:text-[#0798A5]"
            >
              shrikrishankanchansewa@gmail.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
