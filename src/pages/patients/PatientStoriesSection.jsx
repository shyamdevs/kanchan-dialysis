import { useMemo, useState } from 'react';

const getStoryType = (story) => {
  const rawType = [
    story?.type,
    story?.storyType,
    story?.category,
    story?.storyCategory,
  ].find((value) => typeof value === 'string' && value.trim());

  if (!rawType) return 'Other';

  return rawType
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');
};

const normalizeType = (type) => type.trim().toLocaleLowerCase();

const formatTypeLabel = (type) =>
  type.replace(/\b\w/g, (character) => character.toLocaleUpperCase());

export default function PatientStoriesSection({ stories, status, onSelectStory }) {
  const [activeType, setActiveType] = useState('__all__');

  // Types come from the published backend records; no categories or patient stories
  // are hard-coded into the page.
  const storyTypes = useMemo(() => {
    const typesByKey = new Map();

    stories.forEach((story) => {
      const type = getStoryType(story);
      const key = normalizeType(type);
      if (!typesByKey.has(key)) typesByKey.set(key, type);
    });

    return Array.from(typesByKey.entries()).map(([key, label]) => ({ key, label }));
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (activeType === '__all__') return stories;
    return stories.filter(
      (story) => normalizeType(getStoryType(story)) === activeType
    );
  }, [activeType, stories]);

  return (
    <section className="bg-neutral-background/70 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-teal">
              Shared with permission
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-primary-navy sm:text-4xl">
              Patient stories and posts
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
              Explore published patient stories by type. Stories appear here only after an administrator publishes the post and confirms documented consent.
            </p>
          </div>
        </div>

        {status === 'loading' && (
          <p className="mt-8 rounded-xl bg-white p-5 text-text-secondary" role="status">
            Loading published patient posts…
          </p>
        )}

        {status === 'error' && (
          <p className="mt-8 rounded-xl border border-surface-teal bg-background-blue p-5 text-primary-navy" role="status">
            Patient posts are temporarily unavailable. Please try again later.
          </p>
        )}

        {status === 'ready' && stories.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border-subtle bg-white px-6 py-12 text-center">
            <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-background-blue text-2xl text-primary-navy">♡</span>
            <h3 className="mt-4 text-xl font-extrabold text-primary-navy">
              No patient stories published yet
            </h3>
            <p className="mx-auto mt-2 max-w-xl leading-7 text-text-secondary">
              Patient stories will appear here after an administrator publishes them and records the required consent. No sample or static patient data is displayed.
            </p>
          </div>
        )}

        {status === 'ready' && stories.length > 0 && (
          <>
            <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter patient stories by type">
              <button
                type="button"
                onClick={() => setActiveType('__all__')}
                aria-pressed={activeType === '__all__'}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
                  activeType === '__all__'
                    ? 'border-primary-teal-dark bg-primary-teal-dark text-white shadow-sm'
                    : 'border-border-subtle bg-white text-primary-navy hover:border-surface-teal hover:bg-background-blue'
                }`}
              >
                All ({stories.length})
              </button>

              {storyTypes.map(({ key, label }) => {
                const count = stories.filter(
                  (story) => normalizeType(getStoryType(story)) === key
                ).length;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveType(key)}
                    aria-pressed={activeType === key}
                    className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 ${
                      activeType === key
                        ? 'border-primary-teal-dark bg-primary-teal-dark text-white shadow-sm'
                        : 'border-border-subtle bg-white text-primary-navy hover:border-surface-teal hover:bg-background-blue'
                    }`}
                  >
                    {formatTypeLabel(label)} ({count})
                  </button>
                );
              })}
            </div>

            {filteredStories.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStories.map((story) => (
                  <article
                    key={story._id || story.slug || story.title}
                    className="group overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectStory(story)}
                      aria-haspopup="dialog"
                      aria-label={`Read full story: ${story.title}`}
                      className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-teal"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-background-blue">
                        <img
                          src={story.imageUrl}
                          alt={story.title ? `Photo for ${story.title}` : 'Patient story shared with permission'}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary-teal">
                          {formatTypeLabel(getStoryType(story))}
                        </span>
                        <h3 className="mt-2 text-xl font-extrabold text-primary-navy">
                          {story.title}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary-teal">
                          Read full story <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-border-subtle bg-white p-6 text-text-secondary" role="status">
                There are no published stories in this category yet.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
