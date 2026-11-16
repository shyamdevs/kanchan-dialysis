import { useEffect, useRef, useState } from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";
import video6 from "../assets/video6.mp4";
import video7 from "../assets/video7.mp4";
import VideoCarouselHeader from "./VideoCarouselHeader";

const VIDEOS = [
  { src: video1, alt: "Centre tour video" },
  { src: video2, alt: "Dialysis session in progress" },
  { src: video3, alt: "Our care team with a patient" },
  { src: video4, alt: "Patient and family support" },
  { src: video5, alt: "State-of-the-art dialysis equipment" },
  { src: video6, alt: "Comfortable and modern treatment rooms" },
  { src: video7, alt: "Dedicated support staff" },
];

const AUTOPLAY_MS = 3000;

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible] = useState(4);
  const videoRefs = useRef([]);
  const touchStartX = useRef(null);
  const total = VIDEOS.length;
  const maxIndex = Math.max(0, total - visible);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 4 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [maxIndex, current]);

  const goTo = (i) => setCurrent(Math.max(0, Math.min(i, maxIndex)));
  const next = () => setCurrent((p) => (p >= maxIndex ? 0 : p + 1));
  const prev = () => setCurrent((p) => (p <= 0 ? maxIndex : p - 1));

  // ✅ FIX: Videos always play when visible — hover se pause NAHI hongi
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      const isVisible = i >= current && i < current + visible;
      if (isVisible) v.play().catch(() => {});
      else v.pause();
    });
  }, [current, visible]);

  // Autoplay: hover par slide ruk jaayegi (videos chalte rahenge)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const id = setInterval(() => {
      setCurrent((p) => (p >= maxIndex ? 0 : p + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, maxIndex]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const d = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(d) > 40) d < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slideWidth = 100 / visible;
  const dotsCount = maxIndex + 1;

  return (
    <section aria-labelledby="video-gallery-heading" className="relative isolate overflow-hidden bg-background-blue py-14 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="absolute -right-24 top-20 h-48 w-48 rounded-full bg-surface-teal/70 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <VideoCarouselHeader />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-[1.7rem] sm:rounded-[2rem]">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(-${current * slideWidth}%)` }}
            >
              {VIDEOS.map((video, i) => (
                <div key={i} className="shrink-0 px-1.5 sm:px-2" style={{ width: `${slideWidth}%` }}>
                  <div className="relative h-[220px] overflow-hidden rounded-2xl border border-white/80 bg-black shadow-[0_18px_50px_rgba(21,60,91,0.12)] sm:h-[280px] lg:h-[550px]">
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      src={video.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden={i < current || i >= current + visible}
                      aria-label={video.alt}
                      className="h-full w-full object-cover object-center"
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-navy/40 via-transparent to-transparent" />
                    <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" /><path d="M22 9l-6 6M16 9l6 6" strokeLinecap="round" /></svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button type="button" onClick={prev} aria-label="Previous videos" className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-navy shadow-md backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:left-3 sm:h-11 sm:w-11">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={next} aria-label="Next videos" className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-navy shadow-md backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:right-3 sm:h-11 sm:w-11">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}

          {dotsCount > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Go to position ${i + 1}`} aria-current={i === current ? "true" : undefined} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-primary-teal" : "w-2 bg-primary-navy/25 hover:bg-primary-navy/50"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}