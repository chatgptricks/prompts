import { ArrowRight, Copy, Star } from 'lucide-react'
import { useState } from 'react'

export default function PromptCard({ library, prompt, isFavorite, onToggleFavorite, onCopy, view = 'grid' }) {
  const [copyState, setCopyState] = useState('idle')

  const handleCopy = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const ok = await onCopy(library, prompt)
    setCopyState(ok ? 'copied' : 'failed')
    window.setTimeout(() => setCopyState('idle'), 1600)
  }

  const handleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleFavorite(prompt.key)
  }

  return (
    <a href={`#/prompt/${library.id}/${prompt.id}`} className={`prompt-card accent-${library.accent} ${view}`}>
      <div className="prompt-card-preview">
        {prompt.imageUrls?.[0] ? (
          <img src={prompt.imageUrls[0]} alt="" loading="lazy" />
        ) : (
          <div className="prompt-card-glyph" aria-hidden="true">
            <strong>{prompt.emoji}</strong>
            <span>{prompt.category}</span>
          </div>
        )}
      </div>
      <div className="prompt-card-main">
        <div className="prompt-meta">
          <span>{library.shortTitle}</span>
          <span>{prompt.category}</span>
        </div>
        <h3>{prompt.title}</h3>
        <p>{prompt.note}</p>
        <div className="prompt-card-tags">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="prompt-card-actions">
        <button
          type="button"
          className={`icon-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remove from saved prompts' : 'Save prompt'}
        >
          <Star aria-hidden="true" size={17} />
        </button>
        <button type="button" className="icon-button" onClick={handleCopy} aria-label="Copy prompt">
          <Copy aria-hidden="true" size={17} />
        </button>
        <span className="open-chip">
          <span>{copyState === 'idle' ? 'Prompt' : copyState === 'copied' ? 'Copied' : 'Failed'}</span>
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </div>
    </a>
  )
}
