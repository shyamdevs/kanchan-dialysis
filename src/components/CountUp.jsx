import { useEffect, useRef, useState } from "react";

export default function CountUp({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  separator = true,
  firstDigitClassName = "",
  restClassName = "",
}) {
  const [value, setValue] = useState(0);
  const spanRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return undefined;

    const target = Number(end) || 0;
    let frameId;
    const motionPreference = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionPreference?.matches || typeof IntersectionObserver === "undefined") {
      setValue(target);
      hasAnimated.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible || hasAnimated.current) return;

        hasAnimated.current = true;
        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * target));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          } else {
            setValue(target);
          }
        };

        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration]);

  const formatted = separator ? value.toLocaleString("en-IN") : String(value);
  const firstChar = formatted.charAt(0);
  const rest = formatted.slice(1);

  return (
    <span ref={spanRef} className="inline-flex items-baseline tabular-nums">
      {prefix && <span className={restClassName}>{prefix}</span>}
      <span className={firstDigitClassName}>{firstChar}</span>
      <span className={restClassName}>
        {rest}
        {suffix}
      </span>
    </span>
  );
}