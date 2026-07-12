import { Clock3, Home, Library, Star } from 'lucide-react'
import { libraries } from '../lib/content'

const brandLogoUrl = `${import.meta.env.BASE_URL}logoch.png`

const navItems = [
  { href: '#/hub',    label: 'Hub',    icon: Home,    match: 'hub' },
  { href: '#/saved',  label: 'Saved',  icon: Star,    match: 'saved' },
  { href: '#/recent', label: 'Recent', icon: Clock3,  match: 'recent' },
]

export default function AppShell({ activeRoute, favoritesCount, recentCount, children }) {
  return (
    <>

      <div className="app-shell">
        <aside className="side-rail" aria-label="Main navigation">
          <a href="#/hub" className="brand-lockup" aria-label="ChatGPTricks hub">
            <span className="brand-mark logo-mark"><img src={brandLogoUrl} alt="" /></span>
            <span>
              <strong>ChatGPTricks</strong>
              <small>Prompt Library</small>
            </span>
          </a>

          <nav className="rail-nav">
            {navItems.map((item) => {
              const Icon = item.icon
              const count = item.match === 'saved' ? favoritesCount : item.match === 'recent' ? recentCount : null
              return (
                <a key={item.href} href={item.href} className={activeRoute === item.match ? 'active' : ''}>
                  <Icon aria-hidden="true" size={17} />
                  <span>{item.label}</span>
                  {count ? <b>{count}</b> : null}
                </a>
              )
            })}
          </nav>

          <section className="rail-libraries">
            <p>Libraries</p>
            {libraries.map((library) => (
              <a key={library.id} href={`#/library/${library.id}`}>
                <span className={`rail-dot accent-${library.accent}`} />
                {library.shortTitle}
              </a>
            ))}
          </section>
        </aside>

        <div className="app-frame">
          <header className="top-bar">
            <a href="#/hub" className="mobile-brand" aria-label="ChatGPTricks hub">
              <span className="brand-mark logo-mark"><img src={brandLogoUrl} alt="" /></span>
              <span>ChatGPTricks</span>
            </a>
          </header>

          <main>{children}</main>
        </div>

        <nav className="bottom-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.href} href={item.href} className={activeRoute === item.match ? 'active' : ''}>
                <Icon aria-hidden="true" size={20} />
                <span>{item.label}</span>
              </a>
            )
          })}
          <a href="#/hub" className={activeRoute === 'library' ? 'active' : ''}>
            <Library aria-hidden="true" size={20} />
            <span>Library</span>
          </a>
        </nav>
      </div>
    </>
  )
}
