import { useMemo, useState } from 'react';
import {
  getGalleryDescription,
  getGalleryTitle,
  normalizeGalleryCategory,
} from './galleryData';

const normalizeKey = (category) => normalizeGalleryCategory(category).toLocaleLowerCase();

export default function GallerySection({ items, status, onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('__all__');

  // Build category controls from the actual published CMS records; no gallery
  // images or extra categories are invented on the frontend.
  const categories = useMemo(() => {
    const unique = new Map();
    items.forEach((item) => {
      const label = normalizeGalleryCategory(item?.category);
      const key = normalizeKey(label);
      if (key && !unique.has(key)) unique.set(key, label);
    });
    return Array.from(unique, ([key, label]) => ({ key, label }));
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === '__all__') return items;
    return items.filter((item) => normalizeKey(item?.category) === activeCategory);
  }, [activeCategory, items]);

  return (
    <section className="bg-neutral-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-7 max-w-3xl">
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
            Life at the centre
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary-navy sm:text-4xl">
            Gallery photos
          </h2>
          <p className="mt-3 leading-7 text-text-secondary">
            Browse published photos by category. Select a photo to view its full description.
          </p>
        </div>

        {status === 'loading' && (
          <p
            role="status"
            className="rounded-2xl border border-border-subtle bg-white p-6 text-text-secondary shadow-sm"
          >
            Loading published photos…
          </p>
        )}

        {status === 'error' && (
          <div
            role="status"
            className="rounded-2xl border border-surface-teal bg-background-blue p-7 text-primary-navy"
          >
            <h2 className="text-xl font-extrabold">Gallery is temporarily unavailable</h2>
            <p className="mt-2 leading-7">
              We couldn’t load published gallery items. Please try again later.
            </p>
          </div>
        )}

        {status === 'ready' && items.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border-subtle bg-white px-6 py-16 text-center shadow-sm">
            <span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background-blue text-3xl text-primary-navy"
              aria-hidden="true"
            >
              ▧
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-primary-navy">
              No CMS images published yet
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-text-secondary">
              Gallery photos will appear here when an administrator uploads and publishes
              them under an approved gallery category. No static gallery photos are used.
            </p>
          </div>
        )}

        {status === 'ready' && items.length > 0 && (
          <>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter gallery photos by category"
            >
              <button
                type="button"
                onClick={() => setActiveCategory('__all__')}
                aria-pressed={activeCategory === '__all__'}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
                  activeCategory === '__all__'
                    ? 'border-primary-teal-dark bg-primary-teal-dark text-white shadow-sm'
                    : 'border-border-subtle bg-white text-primary-navy hover:border-surface-teal hover:bg-background-blue'
                }`}
              >
                All ({items.length})
              </button>

              {categories.map(({ key, label }) => {
                const count = items.filter((item) => normalizeKey(item?.category) === key).length;
                const isActive = activeCategory === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCategory(key)}
                    aria-pressed={isActive}
                    className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-primary-teal-dark bg-primary-teal-dark text-white shadow-sm'
                        : 'border-border-subtle bg-white text-primary-navy hover:border-surface-teal hover:bg-background-blue'
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>

            {filteredItems.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const description = getGalleryDescription(item);
                  const title = getGalleryTitle(item);

                  return (
                    <article
                      key={item._id || item.slug || item.imageUrl}
                      className="group overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        aria-haspopup="dialog"
                        aria-label={`View gallery image: ${title}`}
                        className="relative block aspect-[4/3] w-full overflow-hidden bg-background-blue text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-teal"
                      >
                        <img
                          src={item.imageUrl}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                        />
                        {/* Desktop/tablet hover overlay. On phones the title and action
                            sit below the image instead, so they are always visible. */}
                        <span className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-primary-navy-dark/95 via-primary-navy-dark/35 to-transparent p-4 opacity-0 transition-opacity duration-300 sm:flex sm:p-5 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                          {item.category && (
                            <span className="mb-2 w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white ring-1 ring-white/30 backdrop-blur-sm">
                              {item.category}
                            </span>
                          )}
                          <span className="text-lg font-extrabold leading-snug text-white sm:text-xl">
                            {title}
                          </span>
                          {description && (
                            <span className="mt-2 line-clamp-3 text-sm leading-6 text-white/90">
                              {description}
                            </span>
                          )}
                          <span className="mt-3 text-sm font-bold text-white">
                            View photo <span aria-hidden="true">→</span>
                          </span>
                        </span>
                      </button>

                      {/* Mobile caption: both the title and View photo action open
                          the same modal as tapping the image itself. */}
                      <div className="flex items-center justify-between gap-3 p-4 sm:hidden">
                        <button
                          type="button"
                          onClick={() => onSelectItem(item)}
                          aria-haspopup="dialog"
                          className="min-w-0 flex-1 text-left text-base font-extrabold leading-snug text-primary-navy focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
                        >
                          <span className="line-clamp-2">{title}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectItem(item)}
                          aria-haspopup="dialog"
                          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background-blue px-3 py-2 text-sm font-extrabold text-primary-navy transition hover:bg-surface-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal"
                        >
                          View photo <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p
                className="mt-8 rounded-xl border border-border-subtle bg-white p-6 text-text-secondary"
                role="status"
              >
                There are no published photos in this category yet.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
