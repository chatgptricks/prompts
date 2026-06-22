import { Check, Copy, RotateCcw, Share2, Sparkles, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import fifaWorldCup2026 from '../data/fifa_world_cup_2026.json'
import { composePrompt, humanizeVariable } from '../lib/content'

const WORLD_CUP_STORAGE_KEYS = {
  matchId: '__fifaWorldCup2026MatchId',
  teamCode: '__fifaWorldCup2026TeamCode',
  stadiumId: '__fifaWorldCup2026StadiumId',
}

const getWorldCupMatch = (values, prompt) => {
  const matchId = values[WORLD_CUP_STORAGE_KEYS.matchId] ?? prompt.customization?.defaultMatchId ?? fifaWorldCup2026.defaults.matchId
  return fifaWorldCup2026.matches.find((match) => match.id === matchId) ?? fifaWorldCup2026.matches[0]
}

const getWorldCupStadium = (values, match) => {
  const stadiumId = values[WORLD_CUP_STORAGE_KEYS.stadiumId] ?? match.stadiumId
  return fifaWorldCup2026.stadiums.find((stadium) => stadium.id === stadiumId) ?? fifaWorldCup2026.stadiums[0]
}

const getWorldCupTeam = (values, match) => {
  const teamCode = values[WORLD_CUP_STORAGE_KEYS.teamCode] ?? match.home.code
  return fifaWorldCup2026.teams.find((team) => team.code === teamCode) ?? fifaWorldCup2026.teams[0]
}

const getWorldCupValues = (prompt, values) => {
  if (prompt.customization?.type !== 'fifa-world-cup-2026') return null

  const match = getWorldCupMatch(values, prompt)
  const stadium = getWorldCupStadium(values, match)
  const supportedTeam = getWorldCupTeam(values, match)
  const scoreboardTime = values['scoreboard time']?.trim() || prompt.customization?.defaultScoreboardTime || fifaWorldCup2026.defaults.scoreboardTime
  const opponent = supportedTeam.code === match.away.code ? match.home : match.away
  const scoreline = `${match.home.name} ${match.home.score}-${match.away.score} ${match.away.name}`

  return {
    match,
    stadium,
    supportedTeam,
    values: {
      match: `${match.home.name} vs ${match.away.name}`,
      'match stage': match.group ? `${match.stageLabel}, Group ${match.group}` : match.stageLabel,
      'home team': match.home.name,
      'away team': match.away.name,
      'home team code': match.home.code,
      'away team code': match.away.code,
      'home score': String(match.home.score),
      'away score': String(match.away.score),
      'scoreline': scoreline,
      'scoreboard text': `${scoreboardTime}  ${scoreline}`,
      'supported team': supportedTeam.name,
      'supported team code': supportedTeam.code,
      'opponent team': opponent.name,
      stadium: stadium.name,
      'venue location': stadium.location,
      'venue city': stadium.city,
      'supporting spectators': `${match.home.name} and ${match.away.name}`,
      'scoreboard time': scoreboardTime,
    },
  }
}

const hiddenWorldCupVariables = new Set([
  'match',
  'match stage',
  'home team',
  'away team',
  'home team code',
  'away team code',
  'home score',
  'away score',
  'scoreline',
  'scoreboard text',
  'supported team',
  'supported team code',
  'opponent team',
  'stadium',
  'venue location',
  'venue city',
  'supporting spectators',
])

export default function PromptComposer({
  library,
  prompt,
  draft,
  onDraftChange,
  onResetDraft,
  onCopy,
  isFavorite,
  onToggleFavorite,
  detailEyebrow,
}) {
  const [status, setStatus] = useState('idle')
  const [activeImage, setActiveImage] = useState(0)
  const values = draft ?? {}
  const worldCupContext = useMemo(() => getWorldCupValues(prompt, values), [prompt, values])
  const variables = useMemo(
    () => (prompt.variables ?? []).filter((variable) => !hiddenWorldCupVariables.has(variable)),
    [prompt.variables],
  )
  const composedValues = useMemo(
    () => ({
      ...values,
      ...(worldCupContext?.values ?? {}),
    }),
    [values, worldCupContext],
  )
  const finalPrompt = useMemo(() => composePrompt(prompt.body, composedValues), [prompt.body, composedValues])

  const setVariable = (name, value) => {
    onDraftChange({
      ...values,
      [name]: value,
    })
  }

  const setVariables = (nextValues) => {
    onDraftChange({
      ...values,
      ...nextValues,
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
              <strong>{prompt.emoji}</strong>
              <span>{library.shortTitle}</span>
            </div>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{detailEyebrow ?? `${library.shortTitle} / ${prompt.category}`}</p>
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

        {worldCupContext ? (
          <WorldCupCustomization
            values={values}
            prompt={prompt}
            context={worldCupContext}
            onChange={setVariables}
          />
        ) : null}

        {variables.length ? (
          <VariableFields variables={variables} values={composedValues} onChange={setVariable} />
        ) : (
          <div className={`no-variables ${worldCupContext ? 'compact' : ''}`}>
            <Check aria-hidden="true" size={18} />
            <span>{worldCupContext ? 'World Cup data selected.' : 'Ready to copy as written.'}</span>
          </div>
        )}

        {prompt.instructions?.length ? (
          <div className="prompt-instructions" aria-label="Prompt instructions">
            <p className="eyebrow">Before You Paste</p>
            <ul>
              {prompt.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>
        ) : null}

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

function VariableFields({ variables, values, onChange }) {
  return (
    <div className="variable-grid">
      {variables.map((variable) => (
        <label key={variable} className="field">
          <span>{humanizeVariable(variable)}</span>
          <input
            value={values[variable] ?? ''}
            onChange={(event) => onChange(variable, event.target.value)}
            placeholder={`Enter ${humanizeVariable(variable).toLowerCase()}`}
          />
        </label>
      ))}
    </div>
  )
}

function WorldCupCustomization({ values, prompt, context, onChange }) {
  const { match, stadium, supportedTeam } = context
  const selectedMatchId = values[WORLD_CUP_STORAGE_KEYS.matchId] ?? prompt.customization?.defaultMatchId ?? fifaWorldCup2026.defaults.matchId
  const selectedTeamCode = values[WORLD_CUP_STORAGE_KEYS.teamCode] ?? supportedTeam.code
  const selectedStadiumId = values[WORLD_CUP_STORAGE_KEYS.stadiumId] ?? stadium.id

  const updateMatch = (matchId) => {
    const nextMatch = fifaWorldCup2026.matches.find((item) => item.id === matchId)
    const nextValues = {
      [WORLD_CUP_STORAGE_KEYS.matchId]: matchId,
      [WORLD_CUP_STORAGE_KEYS.stadiumId]: nextMatch?.stadiumId ?? selectedStadiumId,
    }

    const currentTeamIsInMatch = nextMatch
      ? [nextMatch.home.code, nextMatch.away.code].includes(selectedTeamCode)
      : false

    if (!currentTeamIsInMatch && nextMatch && !nextMatch.home.placeholder) {
      nextValues[WORLD_CUP_STORAGE_KEYS.teamCode] = nextMatch.home.code
    }

    onChange(nextValues)
  }

  return (
    <div className="customization-panel">
      <div className="customization-heading">
        <Sparkles aria-hidden="true" size={17} />
        <span>FIFA World Cup 2026</span>
      </div>
      <div className="variable-grid">
        <label className="field field-wide">
          <span>Match</span>
          <select value={selectedMatchId} onChange={(event) => updateMatch(event.target.value)}>
            {fifaWorldCup2026.matches.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Supported Team</span>
          <select
            value={selectedTeamCode}
            onChange={(event) => onChange({ [WORLD_CUP_STORAGE_KEYS.teamCode]: event.target.value })}
          >
            {fifaWorldCup2026.teams.map((team) => (
              <option key={team.code} value={team.code}>
                {team.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Stadium</span>
          <select
            value={selectedStadiumId}
            onChange={(event) => onChange({ [WORLD_CUP_STORAGE_KEYS.stadiumId]: event.target.value })}
          >
            {fifaWorldCup2026.stadiums.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="selection-summary" aria-live="polite">
        <span>{match.stageLabel}{match.group ? ` · Group ${match.group}` : ''}</span>
        <strong>{match.home.name} {match.home.score}-{match.away.score} {match.away.name}</strong>
        <span>{stadium.name} · {stadium.location}</span>
      </div>
    </div>
  )
}
