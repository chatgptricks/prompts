import rawLibraries from '../data/libraries.json'

const assetModules = import.meta.glob('../../assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const libraryEmojis = {
  presentations: '📊',
  'images-2': '🎨',
  euphoria: '🎬',
  higgsfield: '🧪',
  'world-cup-2026': '🏆',
  nostalgia: '📼',
  superman: '⚡',
  hidden: '🕵️‍♂️',
  harvard: '🎓',
  claude: '🤖',
  gemini: '♊',
}

const categoryEmojis = {
  'Before and After': '🔀',
  'Brand Color': '🎛️',
  Character: '🧑‍🎨',
  'Character Sheet': '🧍',
  Clarity: '🎯',
  'Classic Disney': '🏰',
  Cinematic: '🎞️',
  Corporate: '🏢',
  'CRT TV': '📺',
  'Deck Builder': '📊',
  Education: '🧠',
  Headshot: '📷',
  'Handheld Camera': '🟩',
  Identity: '🧬',
  Learning: '⚡',
  Leverage: '🧰',
  Mastery: '🏆',
  Mindset: '🧭',
  MySpace: '📸',
  Pitch: '🚀',
  'Pixel Art': '🕹️',
  Polaroid: '🖼️',
  Prompt: '✨',
  'PS1 Graphics': '🎮',
  Research: '🔎',
  Restoration: '🧰',
  Script: '🎙️',
  Selfie: '🤳',
  'Sports Broadcast': '🏟️',
  Tabloid: '🗞️',
  Strategy: '♟️',
  Storytelling: '📚',
  Upscale: '🔍',
  VHS: '📼',
  'Vintage Sepia': '🧳',
  Y2K: '💿',
  Memory: '💾',
  Profile: '👤',
  'Blind Spots': '👁️',
  Predictions: '🔮',
  Settings: '⚙️',
  Tracking: '🕵️‍♂️',
  'Prompt Engineering': '🛠️',
  Translation: '🌐',
}

export const assetUrl = (fileName) => {
  if (!fileName) return null
  return assetModules[`../../assets/${fileName}`] ?? null
}

export const getPromptKey = (libraryId, promptId) => `${libraryId}/${promptId}`

export const extractVariables = (body) =>
  Array.from(new Set((body.match(/\[[^\]]+\]/g) ?? []).map((match) => match.slice(1, -1))))

export const humanizeVariable = (variable) =>
  variable
    .replace(/^insert\s+/i, '')
    .replace(/[/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

export const composePrompt = (body, values = {}) =>
  body.replace(/\[([^\]]+)\]/g, (match, name) => {
    const value = values[name]?.trim()
    return value || match
  })

export const libraries = rawLibraries.map((library) => ({
  ...library,
  emoji: libraryEmojis[library.id] ?? '✨',
  coverUrl: assetUrl(library.cover),
  prompts: library.prompts.map((prompt) => {
    const variables = prompt.variables?.length ? prompt.variables : extractVariables(prompt.body)

    return {
      ...prompt,
      variables,
      emoji: categoryEmojis[prompt.category] ?? libraryEmojis[library.id] ?? '✨',
      key: getPromptKey(library.id, prompt.id),
      imageUrls: prompt.images.map(assetUrl).filter(Boolean),
    }
  }),
}))

export const allPrompts = libraries.flatMap((library) =>
  library.prompts.map((prompt) => ({
    ...prompt,
    libraryId: library.id,
    libraryTitle: library.title,
    libraryShortTitle: library.shortTitle,
    libraryAccent: library.accent,
  })),
)

export const stats = {
  libraries: libraries.length,
  prompts: allPrompts.length,
  categories: new Set(allPrompts.map((prompt) => prompt.category)).size,
}

export const findLibrary = (libraryId) => libraries.find((library) => library.id === libraryId)

export const findPrompt = (libraryId, promptId) => {
  const library = findLibrary(libraryId)
  const prompt = library?.prompts.find((item) => item.id === promptId)
  return prompt && library ? { library, prompt } : null
}

export const findPromptByKey = (key) => {
  const [libraryId, promptId] = key.split('/')
  return findPrompt(libraryId, promptId)
}
