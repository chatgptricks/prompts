import { Check, Copy, RotateCcw, Share2, Sparkles, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { composePrompt, humanizeVariable } from '../lib/content'

export default function PromptComposer({
  library,
  prompt,
  draft,
  onDraftChange,
  onResetDraft,
  onCopy,
  isFavorite,
  onToggleFavorite,
}) {
  const [status, setStatus] = useState('idle')
  const [activeImage, setActiveImage] = useState(0)
  const values = draft ?? {}
  const variables = prompt.variables ?? []
  const finalPrompt = useMemo(() => composePrompt(prompt.body, values), [prompt.body, values])

  const setVariable = (name, value) => {
    onDraftChange({
      ...values,
      [name]: value,
    })
  }

  const copyPrompt = async () => {
    const ok = await onCopy(library, prompt, finalPrompt)
    setStatus(ok ? 'copied' : 'failed')
    window.setTimeout(() => setStatus('idle'), 1800)
  }

  const sharePrompt = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: prompt.title, text: prompt.note, url })
        setStatus('shared')
        window.setTimeout(() => setStatus('idle'), 1800)
        return
      } catch {
        return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setStatus('link')
    } catch {
      setStatus('failed')
    }
    window.setTimeout(() => setStatus('idle'), 1800)
  }

  return (
    <section className="composer-grid">
      <article className={`prompt-detail-card accent-${library.accent}`}>
        <div className="detail-media">
          {prompt.imageUrls?.length ? (
            <>
              <img src={prompt.imageUrls[activeImage]} alt="" />
              {prompt.imageUrls.length > 1 ? (
                <div className="image-strip">
                  {prompt.imageUrls.map((url, index) => (
                    <button
                      key={url}
                      type="button"
                      className={index === activeImage ? 'active' : ''}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img src={url} alt="" />
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="detail-glyph" aria-hidden="true">
              <Sparkles size={34} />
              <span>{library.shortTitle}</span>
            </div>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{library.shortTitle} / {prompt.category}</p>
          <h1>{prompt.title}</h1>
          <p>{prompt.note}</p>
          <div className="tag-row">
            {prompt.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </article>

      <article className="composer-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Prompt Composer</p>
            <h2>Customize the variables</h2>
          </div>
          <button
            type="button"
            className={`icon-button ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(prompt.key)}
            aria-label={isFavorite ? 'Remove from saved prompts' : 'Save prompt'}
          >
            <Star aria-hidden="true" size={18} />
          </button>
        </div>

        {variables.length ? (
          <div className="variable-grid">
            {variables.map((variable) => (
              <label key={variable} className="field">
                <span>{humanizeVariable(variable)}</span>
                <input
                  value={values[variable] ?? ''}
                  onChange={(event) => setVariable(variable, event.target.value)}
                  placeholder={`Enter ${humanizeVariable(variable).toLowerCase()}`}
                />
              </label>
            ))}
          </div>
        ) : (
          <div className="no-variables">
            <Check aria-hidden="true" size={18} />
            <span>Ready to copy as written.</span>
          </div>
        )}

        <div className="preview-header">
          <span>Live preview</span>
          <span>{finalPrompt.length.toLocaleString()} chars</span>
        </div>
        <pre className="prompt-preview">{finalPrompt}</pre>

        <div className="composer-actions">
          <button type="button" className="primary-button" onClick={copyPrompt}>
            <Copy aria-hidden="true" size={18} />
            {status === 'copied' ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="secondary-button" onClick={onResetDraft}>
            <RotateCcw aria-hidden="true" size={18} />
            Reset
          </button>
          <button type="button" className={`secondary-button ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(prompt.key)}>
            <Star aria-hidden="true" size={18} />
            Save
          </button>
          <button type="button" className="secondary-button" onClick={sharePrompt}>
            <Share2 aria-hidden="true" size={18} />
            {status === 'link' ? 'Link copied' : status === 'shared' ? 'Shared' : 'Share'}
          </button>
        </div>
        {status === 'failed' ? <p className="action-error">Clipboard access failed in this browser.</p> : null}
      </article>
    </section>
  )
}
