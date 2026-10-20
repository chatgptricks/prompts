import { ArrowRight, Layers3 } from 'lucide-react'
import { motion } from 'framer-motion'

const cardVariants = {
  initial: { opacity: 0, y: 32, scale: 0.93 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function LibraryCard({ library, sectionTitle }) {
  const guideCount = library.prompts.filter((prompt) => prompt.kind === 'guide').length
  const promptCount = library.prompts.length - guideCount
  const libraryLabel = guideCount && guideCount === library.prompts.length ? 'Guide library' : guideCount ? 'Prompts & guides' : 'Prompt library'
  const countLabel = [
    promptCount ? `${promptCount} prompt${promptCount === 1 ? '' : 's'}` : null,
    guideCount ? `${guideCount} guide${guideCount === 1 ? '' : 's'}` : null,
  ].filter(Boolean).join(' · ') || 'No entries yet'

  return (
    <motion.a
      href={`#/library/${library.id}`}
      className={`library-card collection-card accent-${library.accent}`}
      variants={cardVariants}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.975, transition: { duration: 0.1 } }}
    >
      <div className="card-kicker">
        <span>{sectionTitle ?? libraryLabel}</span>
        <Layers3 aria-hidden="true" size={15} />
      </div>
      <h3>{library.shortTitle}</h3>
      <p className="library-card-summary">{library.summary ?? library.description}</p>
      <div className="library-card-footer">
        <span className="library-card-count">{countLabel}</span>
        <span className="card-action">
          View collection
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </div>
    </motion.a>
  )
}
