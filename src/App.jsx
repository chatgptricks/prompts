import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Grid2X2,
  LayoutList,
  Library,
  SlidersHorizontal,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import AppShell from './components/AppShell'
import GlobalBackground from './components/GlobalBackground'
import EmptyState from './components/EmptyState'
import LibraryCard from './components/LibraryCard'
import PromptCard from './components/PromptCard'
import PromptComposer from './components/PromptComposer'
import SearchBox from './components/SearchBox'
import ChatGPTatWork from './components/ChatGPTatWork'
import {
  findLibrary,
  findPrompt,
  findPromptByKey,
  librarySections,
  canonicalPromptKey,
  legacyLibraryRoutes,
  migrateFavorites,
  migrateRecentCopies,
  migrateDrafts,
} from './lib/content'
import { searchPrompts } from './lib/search'
import { readStorage, STORAGE_KEYS, writeStorage } from './lib/storage'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

function routeToLibrary(libraryId) {
  const legacy = legacyLibraryRoutes[libraryId]
  if (legacy?.defaultPromptKey) {
    const [canonicalLibraryId, promptId] = legacy.defaultPromptKey.split('/')
    return { name: 'prompt', libraryId: canonicalLibraryId, promptId, canonicalHash: `#/prompt/${legacy.defaultPromptKey}` }
  }
  if (legacy?.redirectTo) {
    return { name: 'library', libraryId: legacy.redirectTo, canonicalHash: `#/library/${legacy.redirectTo}` }
  }
  return { name: 'library', libraryId }
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const parts = hash.split('/').filter(Boolean)

  if (!parts.length) return { name: 'hub' }
  if (parts[0] === 'hub') return { name: 'hub' }
  if (parts[0] === 'saved') return { name: 'saved' }
  if (parts[0] === 'recent') return { name: 'recent' }
  if (parts[0] === 'ChatGPTatWork') return { name: 'ChatGPTatWork' }
  if (parts[0] === 'library' && parts[1]) return routeToLibrary(parts[1])
  if (parts[0] === 'prompt' && parts[1] && parts[2]) {
    const context = findPrompt(parts[1], parts[2])
    if (context) return { name: 'prompt', libraryId: context.library.id, promptId: context.prompt.id, canonicalHash: `#/prompt/${context.prompt.key}` }
    return { name: 'prompt', libraryId: parts[1], promptId: parts[2] }
  }

  const legacyLibrary = findLibrary(parts[0])
  if (legacyLibrary) return routeToLibrary(legacyLibrary.id)

  return { name: 'hub' }
}

function useStoredState(key, initialValue, migrate = (value) => value) {
  const [value, setValue] = useState(() => migrate(readStorage(key, initialValue)))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue]
}

export default function App() {
  const [route, setRoute] = useState(parseRoute)
  const [favorites, setFavorites] = useStoredState(STORAGE_KEYS.favorites, [], migrateFavorites)
  const [recentCopies, setRecentCopies] = useStoredState(STORAGE_KEYS.recentCopies, [], migrateRecentCopies)
  const [drafts, setDrafts] = useStoredState(STORAGE_KEYS.composerDrafts, {}, migrateDrafts)
  const [preferredView, setPreferredView] = useStoredState(STORAGE_KEYS.preferredView, 'grid')

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (route.canonicalHash && window.location.hash !== route.canonicalHash) {
      window.history.replaceState(null, '', route.canonicalHash)
    }
  }, [route.canonicalHash])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.name, route.libraryId, route.promptId])

  useEffect(() => {
    const context = route.name === 'prompt' ? findPrompt(route.libraryId, route.promptId) : null
    const library = route.name === 'library' ? findLibrary(route.libraryId) : context?.library
    document.title = route.name === 'ChatGPTatWork'
      ? 'ChatGPT at Work | ChatGPTricks'
      : context
        ? `${context.prompt.title} | ChatGPTricks`
        : library
          ? `${library.shortTitle} | ChatGPTricks`
          : 'ChatGPTricks'
  }, [route])

  const favoriteSet = useMemo(() => new Set(favorites), [favorites])

  const toggleFavorite = (key) => {
    setFavorites((current) => (current.includes(key) ? current.filter((item) => item !== key) : [key, ...current]))
  }

  const recordCopy = (library, prompt) => {
    setRecentCopies((current) => {
      const next = [
        {
          key: prompt.key,
          title: prompt.title,
          libraryTitle: library.shortTitle,
          copiedAt: new Date().toISOString(),
        },
        ...current.filter((item) => item.key !== prompt.key),
      ]
      return next.slice(0, 16)
    })
  }

  const copyPrompt = async (library, prompt, text = prompt.body) => {
    try {
      await navigator.clipboard.writeText(text)
      recordCopy(library, prompt)
      return true
    } catch {
      return false
    }
  }

  const updateDraft = (promptKey, value) => {
    setDrafts((current) => ({
      ...current,
      [promptKey]: value,
    }))
  }

  const resetDraft = (promptKey) => {
    setDrafts((current) => {
      const next = { ...current }
      for (const key of Object.keys(next)) {
        if (canonicalPromptKey(key) === canonicalPromptKey(promptKey)) delete next[key]
      }
      return next
    })
  }

  const activeRoute = route.name === 'library' || route.name === 'prompt' ? 'library' : route.name

  if (route.name === 'ChatGPTatWork') {
    return (
      <>
        <GlobalBackground />
        <AnimatePresence mode="wait">
          <motion.div
            key="ChatGPTatWork"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ChatGPTatWork />
          </motion.div>
        </AnimatePresence>
      </>
    )
  }

  return (
    <>
    <GlobalBackground />
    <AppShell activeRoute={activeRoute} favoritesCount={favorites.length} recentCount={recentCopies.length}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${route.name}-${route.libraryId ?? ''}-${route.promptId ?? ''}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {route.name === 'hub' ? (
            <Dashboard />
          ) : null}
          {route.name === 'library' ? (
            <LibraryPage
              libraryId={route.libraryId}
              favoriteSet={favoriteSet}
              preferredView={preferredView}
              setPreferredView={setPreferredView}
              drafts={drafts}
              onDraftChange={updateDraft}
              onResetDraft={resetDraft}
              onToggleFavorite={toggleFavorite}
              onCopy={copyPrompt}
            />
          ) : null}
          {route.name === 'prompt' ? (
            <PromptPage
              libraryId={route.libraryId}
              promptId={route.promptId}
              favoriteSet={favoriteSet}
              drafts={drafts}
              onDraftChange={updateDraft}
              onResetDraft={resetDraft}
              onToggleFavorite={toggleFavorite}
              onCopy={copyPrompt}
            />
          ) : null}
          {route.name === 'saved' ? (
            <SavedPage favoriteSet={favoriteSet} onToggleFavorite={toggleFavorite} onCopy={copyPrompt} />
          ) : null}
          {route.name === 'recent' ? (
            <RecentPage recentCopies={recentCopies} favoriteSet={favoriteSet} onToggleFavorite={toggleFavorite} onCopy={copyPrompt} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </AppShell>
    </>
  )
}

const gridVariants = {
  animate: { transition: { staggerChildren: 0.07 } },
}

function Dashboard() {
  return (
    <div className="page dashboard-page">
      <section className="command-hero library-only-hero">
        <div className="hero-copy">
          <p className="eyebrow">chatgptricks.fun</p>
          <h1>What do you want to do?</h1>
          <p>Find prompts and guides for work, creativity, learning, and better AI conversations.</p>
        </div>
      </section>

      {librarySections.map((section) => (
        <section key={section.id} className="library-section" aria-labelledby={`section-${section.id}`}>
          <header className="library-section-header">
            <div>
              <Library aria-hidden="true" size={18} />
              <h2 id={`section-${section.id}`}>{section.title}</h2>
            </div>
            {section.description ? <p>{section.description}</p> : null}
          </header>
          <motion.div
            className="library-grid"
            variants={gridVariants}
            initial="initial"
            animate="animate"
          >
            {section.libraries.map((library) => (
              <LibraryCard key={library.id} library={library} sectionTitle={section.title} />
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  )
}

function LibraryPage({
  libraryId,
  favoriteSet,
  preferredView,
  setPreferredView,
  drafts,
  onDraftChange,
  onResetDraft,
  onToggleFavorite,
  onCopy,
}) {
  const library = findLibrary(libraryId)
  const [query, setQuery] = useState('')

  const libraryPrompts = useMemo(
    () =>
      library?.prompts.map((prompt) => ({
        ...prompt,
        libraryId: library.id,
        libraryTitle: library.title,
        libraryShortTitle: library.shortTitle,
      })) ?? [],
    [library],
  )

  const visiblePrompts = useMemo(() => {
    return searchPrompts(libraryPrompts, query, libraryPrompts.length)
  }, [libraryPrompts, query])

  if (!library) return <MissingPage />
  const guideCount = library.prompts.filter((prompt) => prompt.kind === 'guide').length
  const entryLabel = guideCount === library.prompts.length ? 'guides' : guideCount ? 'prompts & guides' : 'prompts'
  if (library.entryPromptId) {
    const prompt = library.prompts.find((item) => item.id === library.entryPromptId) ?? library.prompts[0]

    if (!prompt) return <MissingPage />

    return (
      <DirectEntryLibraryPage
        library={library}
        prompt={prompt}
        draft={drafts[prompt.key]}
        favoriteSet={favoriteSet}
        onDraftChange={onDraftChange}
        onResetDraft={onResetDraft}
        onToggleFavorite={onToggleFavorite}
        onCopy={onCopy}
      />
    )
  }

  return (
    <div className="page library-page">
      <section className={`library-hero accent-${library.accent}`}>
        <div className="library-hero-copy">
          <p className="eyebrow">{library.compatibility ? 'Original collection' : 'Collection'} · {library.prompts.length} {entryLabel}</p>
          <h1>{library.title}</h1>
          <p>{library.description}</p>
          <div className="hero-tags">
            {library.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="library-toolbar">
        <SearchBox value={query} onChange={setQuery} placeholder={`Search ${library.shortTitle}`} />
        <div className="view-toggle" aria-label="Prompt view">
          <button type="button" className={preferredView === 'grid' ? 'active' : ''} onClick={() => setPreferredView('grid')} aria-label="Grid view">
            <Grid2X2 aria-hidden="true" size={17} />
          </button>
          <button type="button" className={preferredView === 'list' ? 'active' : ''} onClick={() => setPreferredView('list')} aria-label="List view">
            <LayoutList aria-hidden="true" size={17} />
          </button>
        </div>
      </section>

      {visiblePrompts.length ? (
        <section className={`prompt-grid ${preferredView}`}>
          {visiblePrompts.map((prompt) => (
            <PromptCard
              key={prompt.key}
              library={library}
              prompt={prompt}
              view={preferredView}
              isFavorite={favoriteSet.has(prompt.key)}
              onToggleFavorite={onToggleFavorite}
              onCopy={onCopy}
            />
          ))}
        </section>
      ) : (
        <EmptyState title="No prompts found" body="Try a different search term." />
      )}

      <section className="tips-panel">
        <SlidersHorizontal aria-hidden="true" size={21} />
        <div>
          <h2>{library.tipsTitle}</h2>
          <ul>
            {library.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
      <VisitCounter library={library} />
    </div>
  )
}

function getVisitorBadgeUrl(libraryId) {
  const path = encodeURIComponent(`chatgptricks.fun/${libraryId}`)
  return `https://api.visitorbadge.io/api/visitors?path=${path}`
}

function VisitCounter({ library }) {
  return (
    <aside className="visit-counter" aria-label={`${library.shortTitle} visit counter`}>
      <img src={getVisitorBadgeUrl(library.id)} alt={`${library.shortTitle} visitor counter`} loading="lazy" referrerPolicy="no-referrer" />
    </aside>
  )
}

function DirectEntryLibraryPage({ library, prompt, draft, favoriteSet, onDraftChange, onResetDraft, onToggleFavorite, onCopy }) {
  return (
    <div className="page prompt-page">
      <PromptComposer
        library={library}
        prompt={prompt}
        draft={draft}
        onDraftChange={(value) => onDraftChange(prompt.key, value)}
        onResetDraft={() => onResetDraft(prompt.key)}
        onCopy={onCopy}
        isFavorite={favoriteSet.has(prompt.key)}
        onToggleFavorite={onToggleFavorite}
        detailEyebrow={library.shortTitle}
      />
      {library.prompts.length > 1 ? (
        <section className="related-prompts" aria-label={`More in ${library.shortTitle}`}>
          <h2>More in {library.shortTitle}</h2>
          <div className="prompt-grid">
            {library.prompts.filter((item) => item.id !== prompt.id).map((item) => (
              <PromptCard
                key={item.key}
                library={library}
                prompt={item}
                isFavorite={favoriteSet.has(item.key)}
                onToggleFavorite={onToggleFavorite}
                onCopy={onCopy}
              />
            ))}
          </div>
        </section>
      ) : null}
      <VisitCounter library={library} />
    </div>
  )
}

function PromptPage({ libraryId, promptId, favoriteSet, drafts, onDraftChange, onResetDraft, onToggleFavorite, onCopy }) {
  const context = findPrompt(libraryId, promptId)

  if (!context) return <MissingPage />

  const { library, prompt } = context
  return (
    <div className="page prompt-page">
      <a className="back-link" href={`#/library/${library.id}`}>
        <ArrowLeft aria-hidden="true" size={17} />
        {library.shortTitle}
      </a>
      <PromptComposer
        library={library}
        prompt={prompt}
        draft={drafts[prompt.key]}
        onDraftChange={(value) => onDraftChange(prompt.key, value)}
        onResetDraft={() => onResetDraft(prompt.key)}
        onCopy={onCopy}
        isFavorite={favoriteSet.has(prompt.key)}
        onToggleFavorite={onToggleFavorite}
      />
      {prompt.relatedKeys?.length ? (
        <section className="related-prompts" aria-label="Related prompts">
          <h2>Related prompts</h2>
          <div className="prompt-grid">
            {prompt.relatedKeys.map(findPromptByKey).filter(Boolean).map((related) => (
              <PromptCard key={related.prompt.key} library={related.library} prompt={related.prompt} isFavorite={favoriteSet.has(related.prompt.key)} onToggleFavorite={onToggleFavorite} onCopy={onCopy} />
            ))}
          </div>
        </section>
      ) : null}
      {prompt.visitorCounterId ? <VisitCounter library={{ ...library, id: prompt.visitorCounterId, shortTitle: prompt.title }} /> : null}
    </div>
  )
}

function SavedPage({ favoriteSet, onToggleFavorite, onCopy }) {
  const saved = Array.from(favoriteSet).map(findPromptByKey).filter(Boolean)

  return (
    <CollectionPage
      title="Saved prompts"
      body="Local favorites stored in this browser."
      items={saved}
      favoriteSet={favoriteSet}
      emptyTitle="No saved prompts yet"
      emptyBody="Save prompts from any card or composer."
      onToggleFavorite={onToggleFavorite}
      onCopy={onCopy}
    />
  )
}

function RecentPage({ recentCopies, favoriteSet, onToggleFavorite, onCopy }) {
  const recent = recentCopies
    .map((copy) => {
      const context = findPromptByKey(copy.key)
      return context ? { ...context, copiedAt: copy.copiedAt } : null
    })
    .filter(Boolean)

  return (
    <CollectionPage
      title="Recent copies"
      body="Prompts copied from this browser."
      items={recent}
      favoriteSet={favoriteSet}
      emptyTitle="No recent copies"
      emptyBody="Copy a prompt to build this list."
      onToggleFavorite={onToggleFavorite}
      onCopy={onCopy}
    />
  )
}

function CollectionPage({ title, body, items, favoriteSet, emptyTitle, emptyBody, onToggleFavorite, onCopy }) {
  return (
    <div className="page collection-page">
      <section className="collection-header">
        <p className="eyebrow">Local workspace</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </section>
      {items.length ? (
        <section className="prompt-grid list">
          {items.map(({ library, prompt, copiedAt }) => (
            <div key={`${prompt.key}-${copiedAt ?? 'saved'}`} className="collection-item">
              {copiedAt ? <time dateTime={copiedAt}>{new Date(copiedAt).toLocaleString()}</time> : null}
              <PromptCard
                library={library}
                prompt={prompt}
                view="list"
                isFavorite={favoriteSet.has(prompt.key)}
                onToggleFavorite={onToggleFavorite}
                onCopy={onCopy}
              />
            </div>
          ))}
        </section>
      ) : (
        <EmptyState title={emptyTitle} body={emptyBody} />
      )}
    </div>
  )
}

function SectionHeader({ icon: Icon, title, action }) {
  return (
    <div className="section-header">
      <div>
        <Icon aria-hidden="true" size={19} />
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function MissingPage() {
  return (
    <div className="page">
      <EmptyState title="Route not found" body="Go back to the hub and choose a library or prompt." />
    </div>
  )
}
