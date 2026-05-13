export const STORAGE_KEYS = {
  favorites: 'chatgptricks:favorites',
  recentCopies: 'chatgptricks:recentCopies',
  composerDrafts: 'chatgptricks:composerDrafts',
  preferredView: 'chatgptricks:preferredView',
}

export const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage can be unavailable in strict privacy modes.
  }
}
