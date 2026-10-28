export default function PageBanner({
  label,
  title,
  subtitle,
  image,
  compact = false,
}) {
  return (
    <section
      className={`relative isolate overflow-hidden text-white ${image ? "bg-primary-navy" : "bg-gradient-to-r from-primary-navy via-primary-navy to-primary-teal"} ${compact ? "py-12 sm:py-16" : "py-16 sm:py-30 lg:py-55"}`}
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />
          {/* Keep the photo visible; use only a light left-to-right tint for text contrast. */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary-navy/25 via-primary-navy/10 to-transparent" />
        </>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-28 z-[2] h-72 w-72 rounded-full border-[36px] border-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[42%] z-[2] h-72 w-72 rounded-full border-[36px] border-white/5"
      />

     <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 lg:-translate-x-5">
        {label && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-primary-navy/35 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur-[2px] sm:text-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-secondary-cyan"
            />
            {label}
          </span>
        )}

      <h1 className="mt-6 w-[45%] max-w-4xl -translate-y-8 text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:w-auto sm:text-4xl md:max-w-[50%] md:text-5xl lg:text-6xl">
  {title}
</h1>

        {/* {subtitle && (
          <p className="mt-4 w-full max-w-full text-left text-sm leading-7 text-white/90 sm:text-base sm:leading-8 md:max-w-[40%]">
            {subtitle}
          </p>
        )} */}
      </div>
    </section>
  );
}
