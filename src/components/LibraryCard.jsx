import { ArrowRight, Layers3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LibraryCard({ library }) {
  return (
    <motion.a
      href={`#/library/${library.id}`}
      className={`library-card accent-${library.accent}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
    >
      <div className="library-card-media">
        {library.coverUrl ? <img src={library.coverUrl} alt="" loading="lazy" /> : <VisualGlyph library={library} />}
      </div>
      <div className="library-card-body">
        <div className="card-kicker">
          <span>{library.prompts.length} prompts</span>
          <Layers3 aria-hidden="true" size={16} />
        </div>
        <h2>{library.shortTitle}</h2>
        <p>{library.summary}</p>
        <div className="tag-row">
          {library.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-action">
          Open library
          <ArrowRight aria-hidden="true" size={17} />
        </div>
      </div>
    </motion.a>
  )
}

function VisualGlyph({ library }) {
  return (
    <div className="visual-glyph" aria-hidden="true">
      <span>{library.shortTitle.slice(0, 2).toUpperCase()}</span>
      <i />
      <i />
      <i />
    </div>
  )
}
