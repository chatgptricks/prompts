import rawLibraries from '../data/libraries.json'
import navigation from '../data/library_navigation.json'

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
  'image-trends': '🎨',
  'job-applications': '💼',
  'prompting-toolkit': '🛠️',
  'photo-editing': '📷',
  'portraits-scenes': '🎞️',
  'illustration-characters': '🎨',
  'product-brand-design': '🧴',
  'coding-data': '💻',
  'research-writing': '🔎',
  'learning-growth': '🧠',
  'privacy-memory': '🔐',
}

const categoryEmojis = {
  Career: '💼',
  Coding: '💻',
  Reasoning: '🧩',
  Analysis: '📄',
  Writing: '✍️',
  'Photo Editing': '📷',
  'Product Photography': '🧴',
  Illustration: '🎨',
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

const variablePattern = (style) => style === 'braces' ? /\{([^{}]+)\}/g : /\[([^\]]+)\]/g

export const extractVariables = (body, style = 'brackets') =>
  style === 'literal' ? [] : Array.from(new Set(Array.from(body.matchAll(variablePattern(style)), (match) => match[1])))

export const humanizeVariable = (variable) =>
  variable
    .replace(/^insert\s+/i, '')
    .replace(/[/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

export const composePrompt = (body, values = {}, style = 'brackets') =>
  style === 'literal' ? body : body.replace(variablePattern(style), (match, name) => {
    const value = values[name]?.trim()
    return value || match
  })

export const libraries = rawLibraries.map((library) => ({
  ...library,
  emoji: libraryEmojis[library.id] ?? '✨',
  prompts: library.prompts.map((prompt) => {
    const variables = prompt.variables ?? extractVariables(prompt.body, prompt.placeholderStyle)

    return {
      ...prompt,
      variables,
      emoji: categoryEmojis[prompt.category] ?? libraryEmojis[library.id] ?? '✨',
      key: getPromptKey(library.id, prompt.id),
      imageUrls: prompt.images.map(assetUrl).filter(Boolean),
    }
  }),
}))

export const librarySections = navigation.sections.map((section) => ({
  ...section,
  libraries: libraries.filter((library) => library.section === section.id),
}))

export const canonicalPromptKey = (key) => navigation.promptAliases[key] ?? key

export const legacyLibraryRoutes = Object.fromEntries(
  Object.entries(navigation.legacyLibraries).map(([id, library]) => [id, library.route]),
)

export const migrateFavorites = (keys) => Array.from(new Set(keys.map(canonicalPromptKey)))

export const migrateRecentCopies = (copies) => {
  const seen = new Set()
  return copies.map((copy) => ({ ...copy, key: canonicalPromptKey(copy.key) })).filter((copy) => {
    if (seen.has(copy.key)) return false
    seen.add(copy.key)
    return true
  })
}

export const migrateDrafts = (drafts) => {
  const next = { ...drafts }
  for (const [key, draft] of Object.entries(drafts)) {
    const canonicalKey = canonicalPromptKey(key)
    if (!(canonicalKey in next)) next[canonicalKey] = draft
  }
  return next
}

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

export const findLibrary = (libraryId) => {
  const library = libraries.find((item) => item.id === libraryId)
  if (library) return library
  const legacy = navigation.legacyLibraries[libraryId]
  if (!legacy) return null
  return {
    ...legacy,
    id: libraryId,
    compatibility: true,
    description: 'These prompts are now organized by task. Each opens in its current collection.',
    summary: 'Original collection',
    prompts: legacy.route.canonicalPromptKeys.map((key) => findPromptByKey(key)?.prompt).filter(Boolean),
  }
}

export const findPrompt = (libraryId, promptId) => {
  const [canonicalLibraryId, canonicalPromptId] = canonicalPromptKey(getPromptKey(libraryId, promptId)).split('/')
  const library = libraries.find((item) => item.id === canonicalLibraryId)
  const prompt = library?.prompts.find((item) => item.id === canonicalPromptId)
  return prompt && library ? { library, prompt } : null
}

export const findPromptByKey = (key) => {
  const [libraryId, promptId] = key.split('/')
  return findPrompt(libraryId, promptId)
}
