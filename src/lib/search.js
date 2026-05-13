import Fuse from 'fuse.js'

const options = {
  threshold: 0.34,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.34 },
    { name: 'category', weight: 0.18 },
    { name: 'tags', weight: 0.18 },
    { name: 'body', weight: 0.16 },
    { name: 'note', weight: 0.08 },
    { name: 'libraryTitle', weight: 0.06 },
  ],
}

export const searchPrompts = (items, query, limit = 24) => {
  const cleanQuery = query.trim()
  if (!cleanQuery) return items.slice(0, limit)

  const fuse = new Fuse(items, options)
  return fuse
    .search(cleanQuery, { limit })
    .map((result) => result.item)
}
