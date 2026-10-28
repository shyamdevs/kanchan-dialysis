import { useState } from "react";
import PageBanner from "../components/PageBanner";
import clinic from "../assets/KAN6.jpeg";

const cards = [
  {
    icon: "⌖",
    title: "Visit us",
    detail:
      "29, Janpath, near Dana Pani Restaurant, Shyam Nagar, Sodala, Jaipur, Rajasthan 302019",
    link: "https://www.openstreetmap.org/search?query=Shri%20Kanchan%20Dialysis%20Centre%20Jaipur",
    linkText: "Open map",
  },
  {
    icon: "☎",
    title: "Call the centre",
    detail: "+91 80057 70633",
    link: "tel:+918005770633",
    linkText: "Call now",
  },
  {
    icon: "✉",
    title: "Email us",
    detail: "kanchandialysis@gmail.com",
    link: "mailto:kanchandialysis@gmail.com",
    linkText: "Send email",
  },
  {
    icon: "◷",
    title: "Ask about timings",
    detail:
      "Please call ahead to confirm current hours, session arrangements, and visit preparation.",
    link: "tel:+918005770633",
    linkText: "Confirm by phone",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [ready, setReady] = useState(false);
  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  function submit(event) {
    event.preventDefault();
    const subject = form.subject.trim() || "Consultation request from website";
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:kanchandialysis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }

  return (
    <>
      <PageBanner
       
        title="We’re here to help you take the next step"
        subtitle="For questions about services, visit preparation, volunteering, or contributions, please contact the centre directly."
        image={clinic}
      />
      <section className="bg-neutral-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border-subtle bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-blue text-2xl font-bold text-primary-navy">
                {card.icon}
              </span>
              <h2 className="mt-5 text-lg font-extrabold text-primary-navy">
                {card.title}
              </h2>
              <p className="mt-2 min-h-16 break-words text-sm leading-6 text-text-secondary">
                {card.detail}
              </p>
              <a
                href={card.link}
                target={card.link.startsWith("http") ? "_blank" : undefined}
                rel={card.link.startsWith("http") ? "noreferrer" : undefined}
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary-navy hover:text-primary-navy"
              >
                {card.linkText} <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:px-10">
          <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-lg shadow-primary-navy/5 sm:p-8">
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              Send a message
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary-navy">
              Get in touch
            </h2>
            <p className="mt-3 leading-7 text-text-secondary">
              Complete the form to prepare an email to our team. Your email app
              should open so you can review and send it.
            </p>
            {ready ? (
              <div className="mt-7 rounded-2xl border border-border-subtle bg-neutral-background p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-teal-dark text-xl font-bold text-white">
                  ✓
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-primary-navy">
                  Your email draft is ready
                </h3>
                <p className="mt-2 leading-7 text-text-secondary">
                  Please send the email from your mail app to complete the
                  enquiry.
                </p>
                <button
                  type="button"
                  onClick={() => setReady(false)}
                  className="mt-4 font-bold text-primary-navy underline underline-offset-4"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={update}
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone (optional)">
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update}
                      autoComplete="tel"
                      placeholder="+91…"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Email address">
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Subject (optional)">
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={update}
                    placeholder="How can we help?"
                    className={inputClass}
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    name="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={update}
                    placeholder="Write your question here…"
                    className={inputClass}
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3.5 font-extrabold text-white transition hover:bg-primary-navy sm:w-auto"
                >
                  Prepare email <span>→</span>
                </button>
                <p className="text-xs leading-5 text-text-secondary">
                  Do not include confidential medical details in an ordinary
                  email. For urgent medical concerns, seek appropriate medical
                  assistance.
                </p>
              </form>
            )}
          </div>
          <div className="overflow-hidden rounded-3xl border border-border-subtle bg-neutral-background shadow-sm">
            <img
              src={clinic}
              alt="Shri Kanchan Dialysis Centre entrance"
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="p-6 sm:p-8">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-teal">
                Find the centre
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-primary-navy">
                Shri Kanchan Dialysis Centre
              </h3>
              <p className="mt-3 leading-7 text-text-secondary">
                29, Janpath, near Dana Pani Restaurant, Shyam Nagar, Sodala,
                Jaipur, Rajasthan 302019.
              </p>
              <a
                href="https://www.openstreetmap.org/search?query=Shri%20Kanchan%20Dialysis%20Centre%20Jaipur"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-white px-5 py-3 font-bold text-primary-navy hover:bg-neutral-background"
              >
                View directions ↗
              </a>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border-subtle bg-white">
                <iframe
                  title="Map of Jaipur area"
                  className="h-64 w-full"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=75.7873%2C26.8850%2C75.8473%2C26.9350&layer=mapnik"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-border-subtle bg-white px-4 py-3 text-primary-navy outline-none transition placeholder:text-text-secondary focus:border-primary-teal focus:ring-4 focus:ring-surface-teal";
function Field({ label, children }) {
  return (
    <label className="block text-sm font-bold text-text-secondary">
      {label}
      {children}
    </label>
  );
}
