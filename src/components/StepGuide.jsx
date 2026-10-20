import { ArrowLeft, Check, Copy, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function StepGuide({ library, prompt, isFavorite, onToggleFavorite, onCopy }) {
  const [copyStatus, setCopyStatus] = useState({ key: null, status: 'idle' })
  const resetTimer = useRef(null)
  const steps = prompt.steps ?? []
  const bonus = prompt.bonus ?? []

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const copyText = async (key, body) => {
    let copied = false
    try {
      copied = await onCopy(library, prompt, body)
    } catch {
      copied = false
    }
    window.clearTimeout(resetTimer.current)
    setCopyStatus({ key, status: copied ? 'copied' : 'failed' })
    resetTimer.current = window.setTimeout(() => setCopyStatus({ key: null, status: 'idle' }), 1800)
  }

  const wasCopied = (key) => copyStatus.key === key && copyStatus.status === 'copied'

  return (
    <div className={`page prompt-page step-guide accent-${library.accent}`}>
      <a className="back-link" href={`#/library/${library.id}`}>
        <ArrowLeft aria-hidden="true" size={17} />
        {library.shortTitle}
      </a>

      <header className="step-guide-header">
        <p className="eyebrow">{library.shortTitle} / {steps.length}-step guide</p>
        <h1>{prompt.title}</h1>
        {prompt.note ? <p className="step-guide-intro">{prompt.note}</p> : null}
        <div className="step-guide-actions">
          {prompt.body ? (
            <button type="button" className="primary-button" onClick={() => copyText('all', prompt.body)}>
              {wasCopied('all') ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
              <span aria-live="polite">{wasCopied('all') ? 'Copied' : 'Copy whole guide'}</span>
            </button>
          ) : null}
          <button
            type="button"
            className={`secondary-button ${isFavorite ? 'active' : ''}`}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(prompt.key)}
          >
            <Star aria-hidden="true" size={17} />
            {isFavorite ? 'Saved guide' : 'Save guide'}
          </button>
        </div>
      </header>

      {copyStatus.status === 'failed' ? <p className="action-error" role="status">Clipboard access failed in this browser.</p> : null}

      <ol className="step-guide-steps" aria-label="Guide steps">
        {steps.map((step, index) => (
          <li key={`${index}-${step.title}`} className="step-guide-step">
            <div className="step-guide-step-heading">
              <div>
                <p className="eyebrow">Step {index + 1} of {steps.length}</p>
                <h2>{step.title}</h2>
              </div>
              <button type="button" className="secondary-button" onClick={() => copyText(index, step.body)} aria-label={wasCopied(index) ? `Step ${index + 1} prompt copied` : `Copy prompt for step ${index + 1}`}>
                {wasCopied(index) ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
                <span aria-live="polite">{wasCopied(index) ? 'Copied' : 'Copy prompt'}</span>
              </button>
            </div>
            {step.instructions ? (
              <p className="step-guide-instructions">{Array.isArray(step.instructions) ? step.instructions.join('\n') : step.instructions}</p>
            ) : null}
            <pre className="step-guide-prompt">{step.body}</pre>
          </li>
        ))}
      </ol>

      {bonus.length ? (
        <section className="step-guide-bonus" aria-labelledby="step-guide-bonus-title">
          <h2 id="step-guide-bonus-title">Bonus: keep it clean</h2>
          <div className="step-guide-bonus-grid">
            {bonus.map((tip) => (
              <article key={tip.title} className="step-guide-bonus-card">
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
