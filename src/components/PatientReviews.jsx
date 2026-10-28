import { useEffect, useMemo, useState } from "react";

const reviews = [
  {
    id: "subrata-moitra",
    category: "Family Caregivers",
    badge: "Free Dialysis Care",
    quote:
      "हम अपने Patient का Dialysis पिछले 2 साल से shri kanchan Dialysis center पर करवा रहे है यहाँ पर single use Dialysis free of cast करते है जिसके कारण Patient को अच्छी Dialysis होती है यहाँ पर Cleaning का ध्यान रखा जाता है Kanchan Dialysis center का staff and management अच्छा है",
    name: "Mr. Subrata Moitra",
    role: "Family Testimonial",
    initials: "SM",
    avatarClass: "bg-surface-teal text-primary-teal-dark",
  },
  {
    id: "sanjay",
    category: "Family Caregivers",
    badge: "Supportive Staff",
    quote:
      "हम अपने मरीजों का डायलिसिस पिछले एक साल से श्री कंचन डायलिसिस सेंटर में करवा रहे हैं। यहां मरीजों को बहुत ही अच्छे और व्यवस्थित तरीके से सेवा प्रदान की जाती है। यहां केवल सिंगल यूज़ फिल्टर का उपयोग किया जाता है, जो बिल्कुल मुफ्त होता है। डायलिसिस के लिए यहां का स्टाफ बहुत ही अच्छा और सहायक है।",
    name: "Mr. Sanjay",
    role: "Family Testimonial",
    initials: "S",
    avatarClass: "bg-surface-teal text-primary-navy",
  },
  {
    id: "ramesh",
    category: "Patients",
    badge: "Free Treatment",
    quote:
      "The financial strain of dialysis was overwhelming, and I didn’t know how my family would continue to support me. Finding Shri Kanchan Dialysis Centre was a blessing. I’ve been receiving free dialysis here for the past year, and it has truly saved my life.",
    name: "Ramesh",
    role: "Patient Testimonial",
    initials: "R",
    avatarClass: "bg-surface-teal text-primary-teal-dark",
  },
  {
    id: "sita",
    category: "Patients",
    badge: "Care Without Cost",
    quote:
      "I was devastated when I learned that I needed dialysis, but the cost was impossible for my family to manage. Shri Kanchan Dialysis Centre has given me hope. I am now able to receive treatment regularly, free of charge.",
    name: "Sita",
    role: "Patient Testimonial",
    initials: "S",
    avatarClass: "bg-surface-teal text-primary-navy",
  },
  {
    id: "suresh-sharma",
    category: "Patients",
    badge: "Support For Families",
    quote:
      "Receiving a diagnosis for dialysis was overwhelming, and I feared for my family's financial situation. Shri Kanchan Dialysis Centre stepped in to help. Now, I can focus on my health, knowing I am getting the care I need without any cost.",
    name: "Suresh Sharma",
    role: "Patient Testimonial",
    initials: "SS",
    avatarClass: "bg-surface-teal text-primary-navy",
  },
  {
    id: "aarti-mehta",
    category: "Patients",
    badge: "Compassionate Care",
    quote:
      "I never imagined I would need dialysis, and the thought of the cost was frightening. Shri Kanchan Dialysis Centre has provided me with the necessary treatments at no charge. I am grateful for their compassion and support.",
    name: "Aarti Mehta",
    role: "Patient Testimonial",
    initials: "AM",
    avatarClass: "bg-surface-teal text-primary-teal-dark",
  },
  {
    id: "ravi-singh",
    category: "Patients",
    badge: "Hope And Support",
    quote:
      "Dialysis seemed like a daunting journey, especially with the financial strain it could impose on my family. Shri Kanchan Dialysis Centre has made it possible for me to receive my treatments free of cost, giving me hope for a healthier future.",
    name: "Ravi Singh",
    role: "Patient Testimonial",
    initials: "RS",
    avatarClass: "bg-surface-teal text-primary-teal-dark",
  },
  {
    id: "geeta-joshi",
    category: "Patients",
    badge: "Family Relief",
    quote:
      "The financial strain of dialysis was overwhelming, and I didn’t know how my family would continue to support me. Finding Shri Kanchan Dialysis Centre was a blessing. I’ve been receiving free dialysis here for the past year, and it has truly saved my life.",
    name: "Geeta Joshi",
    role: "Patient Testimonial",
    initials: "GJ",
    avatarClass: "bg-surface-teal text-primary-teal-dark",
  },
];

const categories = ["All Stories", "Patients", "Family Caregivers"];
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?hl=en&output=search&kgmid=%2Fg%2F11rwx1bscz&q=Shri+Kanchan+Dialysis+Centre#lrd=0x396db5a3996adec3:0x76f9a199074ef734,1,,,,";

function QuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M10.4 11.1H5.8c.1-2.5 1.3-4 3.5-4.9L8 3.8C4.2 5.2 2.5 8.2 2.5 12.4v6h7.9v-7.3Zm11.1 0h-4.6c.1-2.5 1.3-4 3.5-4.9l-1.3-2.4c-3.8 1.4-5.5 4.4-5.5 8.6v6h7.9v-7.3Z" />
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="group flex h-full min-h-[320px] min-w-0 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-white p-5 shadow-[0_8px_30px_rgba(21,60,91,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-teal/40 hover:shadow-[0_18px_40px_rgba(21,60,91,0.09)] sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-primary-teal" aria-hidden="true">
          <QuoteIcon />
        </span>
        <span className="rounded-full border border-surface-teal bg-background-blue px-3 py-1 text-[11px] font-semibold text-primary-teal-dark">
          {review.badge}
        </span>
      </div>

      <blockquote className="flex-1 whitespace-pre-line text-sm italic leading-7 text-text-secondary sm:text-[15px]">
        “{review.quote}”
      </blockquote>

      <div className="my-5 border-t border-dashed border-border-subtle" />

      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-white shadow-sm ${review.avatarClass}`}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="break-words text-sm font-bold text-primary-navy">
            {review.name}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-primary-teal">
            {review.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon({ direction }) {
  return direction === "left" ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function PatientReviewsStatic() {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      setItemsPerView(width >= 1024 ? 3 : width >= 640 ? 2 : 1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const filteredReviews = useMemo(
    () =>
      activeCategory === "All Stories"
        ? reviews
        : reviews.filter((review) => review.category === activeCategory),
    [activeCategory]
  );

  const visibleReviews = useMemo(() => {
    if (filteredReviews.length === 0) return [];
    const count = Math.min(itemsPerView, filteredReviews.length);
    return Array.from({ length: count }, (_, offset) =>
      filteredReviews[(activeIndex + offset) % filteredReviews.length]
    );
  }, [filteredReviews, activeIndex, itemsPerView]);

  const moveCarousel = (direction) => {
    if (filteredReviews.length < 2) return;
    setActiveIndex(
      (current) =>
        (current + direction + filteredReviews.length) % filteredReviews.length
    );
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-background-blue px-4 py-16 text-primary-navy sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="patient-reviews-heading"
    >
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-surface-teal/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-surface-teal/40 blur-3xl"
      />

      <div className="mx-auto max-w-[1280px]">
        {/* Section Heading */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-teal bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-teal shadow-sm sm:text-xs">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.4 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z"
              />
            </svg>
            Patient Stories
          </span>

          <h1
            id="patient-reviews-heading"
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-[42px]"
          >
            Heartfelt Stories From{" "}
            <span className="text-primary-teal">Our Patients</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
            Testimonials shared by patients and families about their experiences
            with Shri Kanchan Dialysis Centre.
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-teal" />
        </header>

        {/* Filters And Carousel Controls */}
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
            aria-label="Filter stories"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 sm:text-sm ${
                    isActive
                      ? "border-primary-teal bg-primary-teal-dark text-white shadow-md shadow-primary-teal/15"
                      : "border-border-subtle bg-white text-text-secondary hover:border-primary-teal hover:text-primary-teal-dark"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              disabled={filteredReviews.length < 2}
              aria-label="Previous Reviews"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-white text-primary-navy shadow-sm transition hover:border-primary-teal hover:text-primary-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              disabled={filteredReviews.length < 2}
              aria-label="Next Reviews"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-white text-primary-navy shadow-sm transition hover:border-primary-teal hover:text-primary-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        {/* Review Cards */}
        <div className="mt-6" aria-live="polite" aria-atomic="true">
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        {filteredReviews.length > 1 && (
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
            aria-label="Choose review slide"
          >
            {filteredReviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show Review Slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
                  activeIndex === index
                    ? "w-7 bg-primary-teal"
                    : "w-2.5 bg-surface-teal hover:bg-primary-teal"
                }`}
              />
            ))}
          </div>
        )}

        {/* Closing CTA */}
        <div className="mt-10 rounded-3xl border border-border-subtle bg-white px-5 py-8 text-center shadow-[0_8px_30px_rgba(21,60,91,0.04)] sm:px-8">
          <h2 className="text-xl font-bold leading-snug text-primary-navy sm:text-2xl">
            Every Patient Deserves Care With Dignity.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            Shri Kanchan Dialysis Centre and Shri Krishan Kanchan Sewa Trust
            remain committed to compassionate support for patients and families.
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-teal px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-teal/15 transition hover:-translate-y-0.5  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
          >
            View Google Listing
            <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
