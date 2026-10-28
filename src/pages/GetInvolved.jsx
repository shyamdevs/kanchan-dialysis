import { useState } from "react";
import PageBanner from "../components/PageBanner";
import getinvolved from "../assets/kanchan-dialysis-get-involved-banner.png";
import community from "../assets/KAN6.jpeg";

const paths = [
  {
    icon: "♡",
    title: "Support the mission",
    detail:
      "Learn how to make a contribution after confirming details directly with the trust.",
    link: "/donate",
    action: "Donation information",
  },
  {
    icon: "✚",
    title: "Share your expertise",
    detail:
      "Healthcare professionals and community volunteers can contact the team to discuss ways to help.",
    link: "#volunteer-form",
    action: "Volunteer enquiry",
  },
  {
    icon: "◉",
    title: "Community awareness",
    detail:
      "Help share accurate information and encourage people to contact qualified healthcare teams for care guidance.",
    link: "/contact",
    action: "Contact us",
  },
];
const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-border-subtle bg-white px-4 py-3 text-primary-navy outline-none placeholder:text-text-secondary focus:border-primary-teal focus:ring-4 focus:ring-surface-teal";

export default function GetInvolved() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "Community volunteering",
    availability: "Flexible",
    experience: "",
    message: "",
  });
  const [ready, setReady] = useState(false);
  function update(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }
  function submit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(
      "Volunteer enquiry — Shri Kanchan Dialysis Centre",
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCity: ${form.city}\nInterest: ${form.interest}\nAvailability: ${form.availability}\nExperience: ${form.experience}\n\nMessage: ${form.message}`,
    );
    window.location.href = `mailto:kanchandialysis@gmail.com?subject=${subject}&body=${body}`;
    setReady(true);
  }

  return (
    <>
      <PageBanner
      
        title="Be part of the mission of seva"
        subtitle="Explore ways to support the work of Shri Krishan Kanchan Sewa Trust through volunteering, awareness, and contributions."
        image={getinvolved}
      />
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {paths.map((path) => (
              <article
                key={path.title}
                className="rounded-2xl border border-border-subtle bg-neutral-background p-6 sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-blue text-2xl font-bold text-primary-navy">
                  {path.icon}
                </span>
                <h2 className="mt-5 text-xl font-extrabold text-primary-navy">
                  {path.title}
                </h2>
                <p className="mt-3 leading-7 text-text-secondary">
                  {path.detail}
                </p>
                <a
                  href={path.link}
                  className="mt-5 inline-flex items-center gap-2 font-extrabold text-primary-navy hover:text-primary-navy"
                >
                  {path.action} <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="volunteer-form"
        className="scroll-mt-32 bg-neutral-background/70 py-14 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              Volunteer enquiry
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary-navy sm:text-4xl">
              Share how you would like to help.
            </h2>
            <p className="mt-5 leading-8 text-text-secondary">
              Tell us a little about your interests and availability. This form
              prepares an email to the centre; no application is stored on this
              website.
            </p>
            <img
              src={community}
              alt="Community service event"
              loading="lazy"
              className="mt-7 h-64 w-full rounded-2xl object-cover shadow-lg sm:h-80"
            />
            <p className="mt-3 text-xs leading-5 text-text-secondary">
              Volunteer requirements and opportunities are confirmed by the
              centre’s team.
            </p>
          </div>
          <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-lg shadow-primary-navy/5 sm:p-8">
            {ready ? (
              <div className="rounded-2xl border border-border-subtle bg-neutral-background p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-teal-dark text-xl font-bold text-white">
                  ✓
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-primary-navy">
                  Your enquiry email is ready
                </h3>
                <p className="mt-2 leading-7 text-text-secondary">
                  Please review and send it in your email app to complete the
                  enquiry.
                </p>
                <button
                  type="button"
                  onClick={() => setReady(false)}
                  className="mt-4 font-bold text-primary-navy underline underline-offset-4"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={update}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update}
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Phone number">
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={update}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+91…"
                    />
                  </Field>
                  <Field label="City">
                    <input
                      name="city"
                      value={form.city}
                      onChange={update}
                      className={inputClass}
                      placeholder="Your city"
                    />
                  </Field>
                  <Field label="Area of interest">
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={update}
                      className={inputClass}
                    >
                      <option>Community volunteering</option>
                      <option>Healthcare professional</option>
                      <option>Awareness programme</option>
                      <option>Donation / CSR enquiry</option>
                      <option>Other support</option>
                    </select>
                  </Field>
                  <Field label="Availability">
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={update}
                      className={inputClass}
                    >
                      <option>Flexible</option>
                      <option>Weekdays</option>
                      <option>Weekends</option>
                      <option>Occasional events</option>
                    </select>
                  </Field>
                </div>
                <Field label="Relevant experience (optional)">
                  <textarea
                    name="experience"
                    rows="3"
                    value={form.experience}
                    onChange={update}
                    className={inputClass}
                    placeholder="Skills or experience you would like to share"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={form.message}
                    onChange={update}
                    className={inputClass}
                    placeholder="Tell us how you would like to help"
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-6 py-3.5 font-extrabold text-white hover:bg-primary-navy sm:w-auto"
                >
                  Prepare volunteer enquiry <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
function Field({ label, children }) {
  return (
    <label className="block text-sm font-bold text-text-secondary">
      {label}
      {children}
    </label>
  );
}
