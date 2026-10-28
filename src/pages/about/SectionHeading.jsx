export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-teal sm:text-sm">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary-teal" />
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-primary-navy sm:text-4xl lg:text-[2.65rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
