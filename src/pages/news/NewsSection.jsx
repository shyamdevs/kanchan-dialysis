import { useMemo, useState } from 'react';
import NewsMedia from './NewsMedia';
import {
  getNewsCategories,
  getNewsTitle,
  normalizeNewsCategory,
} from './newsData';

const ALL_CATEGORIES = '__all__';

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
        active
          ? 'border-primary-teal-dark bg-primary-teal-dark text-white shadow-sm'
          : 'border-border-subtle bg-white text-primary-navy hover:border-surface-teal hover:bg-background-blue'
      }`}
    >
      {children}
    </button>
  );
}

function NewsLoading() {
  return (
    <p role="status" className="rounded-2xl border border-border-subtle bg-white p-6 text-text-secondary shadow-sm">
      Loading published updates…
    </p>
  );
}

function NewsError() {
  return (
    <div role="status" className="rounded-2xl border border-surface-teal bg-background-blue p-7 text-primary-navy">
      <h2 className="text-xl font-extrabold">Updates are temporarily unavailable</h2>
      <p className="mt-2 leading-7">We couldn’t load the published news. Please check back later.</p>
    </div>
  );
}

function NewsEmpty({ category = false }) {
  return (
    <div className="rounded-3xl border border-dashed border-border-subtle bg-white px-6 py-16 text-center">
      <span
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background-blue text-3xl text-primary-navy"
        aria-hidden="true"
      >
        ▤
      </span>
      <h2 className="mt-5 text-2xl font-extrabold text-primary-navy">
        {category ? 'No updates in this category yet' : 'No news updates published yet'}
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-text-secondary">
        {category
          ? 'There are no published updates in this category. Choose another category to see more news.'
          : 'News photos, videos, and announcements will appear here after an administrator adds and publishes an update. Only published content is visible to visitors.'}
      </p>
    </div>
  );
}

export default function NewsSection({ items, status, onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(() => getNewsCategories(items), [items]);
  const filteredItems = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return items;
    return items.filter(
      (item) => normalizeNewsCategory(item?.category) === activeCategory,
    );
  }, [activeCategory, items]);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-7 max-w-3xl">
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
            From the centre
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-primary-navy sm:text-4xl">
            Latest news & updates
          </h2>
          <p className="mt-3 leading-7 text-text-secondary">
            Browse centre announcements, activities, photos and videos. Select an update to read the full story.
          </p>
        </div>

        {status === 'loading' && <NewsLoading />}
        {status === 'error' && <NewsError />}
        {status === 'ready' && items.length === 0 && <NewsEmpty />}

        {status === 'ready' && items.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
              <FilterButton
                active={activeCategory === ALL_CATEGORIES}
                onClick={() => setActiveCategory(ALL_CATEGORIES)}
              >
                All ({items.length})
              </FilterButton>

              {categories.map(({ key, label }) => {
                const count = items.filter(
                  (item) => normalizeNewsCategory(item?.category) === key,
                ).length;
                return (
                  <FilterButton
                    key={key}
                    active={activeCategory === key}
                    onClick={() => setActiveCategory(key)}
                  >
                    {label} ({count})
                  </FilterButton>
                );
              })}
            </div>

            {filteredItems.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item, index) => {
                  const title = getNewsTitle(item);
                  return (
                    <article
                      key={item._id || item.slug || `${title}-${index}`}
                      className="group overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <NewsMedia item={item} onSelect={onSelectItem} />

                      <div className="p-4 sm:p-5">
                        <button
                          type="button"
                          onClick={() => onSelectItem(item)}
                          aria-haspopup="dialog"
                          className="block w-full text-left text-lg font-extrabold leading-snug text-primary-navy transition hover:text-primary-teal focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-teal sm:text-xl"
                        >
                          {title}
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectItem(item)}
                          aria-haspopup="dialog"
                          className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg font-extrabold text-primary-navy transition hover:text-primary-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-teal"
                        >
                          Read full update <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8"><NewsEmpty category /></div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
