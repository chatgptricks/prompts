import './style.css'

const assetUrl = fileName => new URL(`./assets/${fileName}`, import.meta.url).href

const libraries = [
  {
    id: 'presentations',
    name: 'Presentation Prompts',
    shortName: 'Presentations',
    accent: 'emerald',
    summary: '7 prompts to create complete decks, pitches, scripts, and research presentations.',
    title: 'ChatGPT 5.5 Presentation Prompts',
    description: 'Build complete decks, pitch stories, research presentations, and speaker scripts from a single structured prompt.',
    tipsTitle: 'Pro Tips for Presentations',
    tips: [
      'Iterate and refine: ask ChatGPT to expand specific slides or change the tone.',
      'Add your personal touch: use the AI-generated content as a foundation, then add your own stories and examples.',
      'Visuals matter: pair these prompts with Images 2.0 to generate custom visuals for your slides.',
      'Practice delivery: use the script prompt to rehearse pacing and emphasis.'
    ],
    prompts: [
      {
        title: 'Full Presentation Builder',
        prompt: [
          'Act as a world-class presentation creator. Create a complete slide-by-slide presentation about [topic] for [audience].',
          'Include title slide, key points, examples, data, one strong metaphor, visual suggestions, and a closing call-to-action.',
          'Structure it with a TED-style storytelling flow: clear hook, useful insight, and memorable ending.'
        ],
        note: 'Best for turning a raw topic into a complete deck structure.'
      },
      {
        title: 'Deep Research Presentation',
        prompt: [
          'Create a research-backed presentation about [topic] for [audience].',
          'Include real statistics, case studies, expert quotes, practical insights, and concrete examples.',
          'Make each slide educational and engaging. Add source references at the end.'
        ],
        note: 'Best when credibility and supporting evidence matter.'
      },
      {
        title: 'Simplified Explanation',
        prompt: [
          'Build a beginner-friendly presentation about [topic] for [audience].',
          'Break down complex concepts into simple explanations, analogies, and step-by-step logic.',
          'Make the content clear enough for a complete beginner to understand without prior knowledge.'
        ],
        note: 'Best for education, onboarding, and complex topics.'
      },
      {
        title: 'Business Pitch Presentation',
        prompt: [
          'Create a complete investor-style pitch deck for this business idea: [business idea].',
          'Include problem, solution, market size, product features, business model, competitive advantage, financial projections, team slide, and closing pitch script.'
        ],
        note: 'Best for startup ideas, internal proposals, and funding decks.'
      },
      {
        title: 'The Storytelling Master',
        prompt: [
          'Create a complete presentation about [topic] using this storytelling structure:',
          'Hook -> Conflict -> Journey -> Insight -> Transformation -> Call to Action.',
          'Make the slides emotional, memorable, and persuasive. Add concise speaker notes with delivery guidance.'
        ],
        note: 'Best for persuasive talks and narrative-driven decks.'
      },
      {
        title: 'Corporate Presentation',
        prompt: [
          'Create a formal corporate presentation about [topic] for [company/team/audience].',
          'Include professional tone, structured bullet points, charts, graphs, SWOT analysis, trends, forecasts, and data-backed recommendations.',
          'Make it suitable for boardrooms.'
        ],
        note: 'Best for executive, boardroom, and internal strategy contexts.'
      },
      {
        title: 'Complete Presentation + Script Combo',
        prompt: [
          'Create a ready-to-use presentation about [topic] for [audience], and write a complete spoken script I can read while presenting.',
          'Ensure the script matches the tone, pacing, and emotional flow of the slides.',
          'Include pauses, emphasis, storytelling cues, and delivery instructions.'
        ],
        note: 'Best when you need both slides and delivery support.'
      }
    ]
  },
  {
    id: 'images-2',
    name: 'Images 2.0 Prompts',
    shortName: 'Images 2.0',
    accent: 'cyan',
    summary: '15 prompts for characters, mockups, print, icons, storyboards, typography, and visual systems.',
    title: 'Images 2.0 Prompt Library',
    description: 'A structured set of visual prompts with a consistent purpose, prompt text, and example-image placeholder for each item.',
    tipsTitle: 'Pro Tips for Images 2.0',
    tips: [
      'Replace bracketed text before copying so the model has concrete subject, style, and content details.',
      'Keep brand-critical details consistent across prompts: character traits, palette, typography, and layout.',
      'Use the image placeholder on each card for a final example, variant, or before/after reference.',
      'For text-heavy outputs, include the self-review line to reduce spelling and anatomy issues.'
    ],
    prompts: [
      {
        title: 'Generate 8 Poses for the Same Character',
        category: 'Character',
        prompt: [
          'Draw the same character [character description] in 8 different poses/expressions in one image:',
          '1. Smiling 2. Surprised 3. Sad 4. Reading 5. Working on a laptop 6. Drinking coffee 7. On the phone 8. Giving a presentation.',
          'Keep the character design consistent across all 8 versions. Use 2K resolution and a plain background.'
        ],
        note: 'Excellent for unifying brand characters or social media accounts.',
        image: assetUrl('1.png')
      },
      {
        title: 'Character Design from All Angles',
        category: 'Character Sheet',
        prompt: ['Design a character reference sheet for [character description] from 3 angles: front, side, and back. Use [style: anime/3D/cartoon] with a clean plain background.'],
        note: 'Locks in the character features so you can reuse the same design from different angles.',
        image: assetUrl('2.png')
      },
      {
        title: 'High-Precision Text Writing',
        category: 'Typography',
        prompt: ['Create a [design type] and write this exact text: [text]. Use a bold, clear font with perfect spelling and high readability.'],
        note: 'Useful for thumbnails, ads, and designs where manual text cleanup would slow you down.',
        image: assetUrl('3.png')
      },
      {
        title: 'Print Quality 2K',
        category: 'Print',
        prompt: ['Create a print-ready [poster/brochure/flyer] about [topic], in very high 2K resolution, A4 dimensions, portrait orientation, sharp details, and clean margins.'],
        note: 'Append this to poster, flyer, brochure, or one-page design prompts.',
        image: assetUrl('4.png')
      },
      {
        title: 'Generate Multilingual Designs',
        category: 'Localization',
        prompt: ['Create 3 versions of this [design type] in exactly the same layout: version 1 in [language 1], version 2 in [language 2], and version 3 in [language 3]. Keep spacing, hierarchy, and style consistent.'],
        note: 'Ready for publishing the same visual concept across multilingual platforms.',
        images: [assetUrl('5a.png'), assetUrl('5b.png'), assetUrl('5c.png')]
      },
      {
        title: 'Self-Review Command',
        category: 'Quality Control',
        prompt: ['After generating the image, self-review [hands/fingers], [faces], and [text spelling]. Correct visible errors before showing the final result.'],
        note: 'Add this when hands, readable text, or polish are important.',
        image: assetUrl('6.png')
      },
      {
        title: 'Legal Design Cloning via Link',
        category: 'Style Reference',
        prompt: ['Visit [reference link], analyze its visual style, and create a new original image in a similar style using my content: [your content]. Do not copy logos, trademarks, or exact layout.'],
        note: 'Use for inspiration and style analysis while keeping the final content specific to your own project.',
        image: assetUrl('7.png')
      },
      {
        title: 'Professional-Lens Realism',
        category: 'Photography',
        prompt: ['Create a highly realistic photorealistic image of [subject], shot with a 35mm lens, cinematic lighting, sharp focus, natural depth of field, and high-resolution detail.'],
        note: 'Best for visuals that should feel like professional photography.',
        image: assetUrl('8.png')
      },
      {
        title: 'Designing Product Mockups',
        category: 'Mockups',
        prompt: ['Place [logo/text] realistically on [product], integrated into the material, lighting, and perspective. Show it in use by [person/context] in a natural lifestyle scene.'],
        note: 'Use to showcase products, merch, and branded assets quickly.',
        image: assetUrl('9.png')
      },
      {
        title: 'Create a Complete Icon Set',
        category: 'Icon Set',
        prompt: ['Create a cohesive set of 6 icons for [app/topic] in a flat design style. Use only [color 1] and [color 2], consistent stroke/shape language, and a transparent background.'],
        note: 'Excellent for app designers and visual identity systems.',
        image: assetUrl('10.png')
      },
      {
        title: 'Split Screen for Comparisons',
        category: 'Before and After',
        prompt: ['Create a split-screen before/after image. Left side: [problem state]. Right side: the same scene after [solution/result]. Keep the composition aligned for easy comparison.'],
        note: 'Strong for ads that show a clear problem and solution.',
        image: assetUrl('11.png')
      },
      {
        title: 'Strict Color Palette Control',
        category: 'Brand Color',
        prompt: ['Draw [subject/scene] using only this color palette: [color 1], [color 2], [color 3]. Strictly avoid all other colors and keep the palette consistent.'],
        note: 'Use to keep campaign visuals aligned with a specific brand palette.',
        image: assetUrl('12.png')
      },
      {
        title: 'Sequential Image Generation',
        category: 'Storyboarding',
        prompt: ['Using the same character, outfit, and visual style from the previous image, draw the character now [new action/scene]. Keep identity and style consistent.'],
        note: 'Perfect for comics, storyboards, and sequential social content.',
        image: assetUrl('13.png')
      },
      {
        title: 'Structural Infographic Designs',
        category: 'Infographic',
        prompt: ['Design an empty, ready-to-fill infographic template about [topic], divided into [number] sequential steps. Use a modern layout and leave clean blank spaces for text.'],
        note: 'Use when you want a custom template instead of a stock infographic layout.',
        image: assetUrl('14.png')
      },
      {
        title: 'Transform a Doodle into a Masterpiece',
        category: 'Sketch Upgrade',
        prompt: ['Take this uploaded sketch, preserve its main structure and composition, and transform it into a high-quality [style] design with polished lighting, depth, and detail.'],
        note: 'Upload a rough sketch first, then use this to preserve the idea while upgrading the finish.',
        image: assetUrl('15.png')
      }
    ]
  },
  {
    id: 'euphoria',
    name: 'Animation Style Prompts',
    shortName: 'Animation Styles',
    accent: 'cyan',
    summary: '11 prompts to reimagine one show, movie, or scene through famous animation and visual styles.',
    title: 'Animation Style Prompt Library',
    description: 'Use one source scene and quickly explore it across recognizable animation, collage, 3D, anime, and cinematic treatments.',
    tipsTitle: 'Pro Tips for Style Reimaginings',
    tips: [
      'Replace [show/movie/scene] with a concrete subject, then keep it the same across every style.',
      'Keep core character traits consistent so each result feels like a true reinterpretation, not a new concept.',
      'Use the same aspect ratio across all prompts if you are building a carousel.',
      'Add brand-safe wording when you want inspiration from a style without copying exact characters, logos, or layouts.'
    ],
    prompts: [
      {
        title: 'Lavish Hand-Drawn Fantasy',
        category: 'Don Bluth',
        prompt: ['Reimagine [show/movie/scene] as a lavish hand-drawn fantasy animation with lush lighting, expressive eyes, painterly backgrounds, dramatic posing, and warm cinematic emotion.'],
        note: 'Best for nostalgic fantasy energy, expressive characters, and rich illustrated drama.',
        image: assetUrl('style-01-don-bluth.png')
      },
      {
        title: 'Classic Claymation',
        category: 'Claymation',
        prompt: ['Reimagine [show/movie/scene] as classic clay stop-motion with handmade clay textures, tiny physical sets, imperfect sculpted details, soft studio lighting, and tactile charm.'],
        note: 'Best for cozy handmade scenes that feel crafted frame by frame.',
        image: assetUrl('style-02-claymation.png')
      },
      {
        title: 'Layered Paper Cut Collage',
        category: 'Paper Cut',
        prompt: ['Reimagine [show/movie/scene] as a 2D paper-cut collage made from layered cut paper, flat shapes, visible paper texture, soft shadows, and a crafted storybook composition.'],
        note: 'Best for editorial, handmade, and charming flat-layout visuals.',
        image: assetUrl('style-03-paper-cut.png')
      },
      {
        title: '1930s Rubber-Hose Cartoon',
        category: 'Fleischer',
        prompt: ['Reimagine [show/movie/scene] as a 1930s rubber-hose cartoon with black-and-white ink lines, bendy limbs, vintage character posing, theatrical expressions, and old animation charm.'],
        note: 'Best for retro cartoon energy with playful exaggeration.',
        image: assetUrl('style-04-fleischer.png')
      },
      {
        title: 'Nostalgic Holiday Stop-Motion',
        category: 'Rankin/Bass',
        prompt: ['Reimagine [show/movie/scene] as nostalgic stop-motion with cozy miniature sets, slightly janky character puppets, warm holiday lighting, soft textures, and storybook staging.'],
        note: 'Best for warm, odd, handcrafted scenes with a vintage TV-special feel.',
        image: assetUrl('style-05-rankin-bass.png')
      },
      {
        title: 'Yellow Sitcom Cartoon',
        category: 'Simpsons',
        prompt: ['Reimagine [show/movie/scene] as a classic yellow-skin satirical sitcom cartoon with bold outlines, flat colors, expressive crowd staging, simple backgrounds, and comedic visual timing.'],
        note: 'Best for instantly readable parody-style scenes and ensemble casts.',
        image: assetUrl('style-06-simpsons.png')
      },
      {
        title: 'Polished 3D Animated Feature',
        category: 'Pixar',
        prompt: ['Reimagine [show/movie/scene] as a polished 3D animated feature with warm lighting, expressive faces, impeccable shot composition, soft materials, and cinematic depth.'],
        note: 'Best for clean, emotional, family-film-style visual storytelling.',
        image: assetUrl('style-07-pixar.png')
      },
      {
        title: 'Deliberately Bad MS Paint',
        category: 'MS Paint',
        prompt: ['Reimagine [show/movie/scene] as deliberately crude MS Paint art with simple brush lines, flat fills, awkward anatomy, uneven shapes, and charming low-effort computer-drawing energy.'],
        note: 'Best for humor, memes, and intentionally rough visual contrast.',
        image: assetUrl('style-08-ms-paint.png')
      },
      {
        title: 'Chaotic Adult Sci-Fi Cartoon',
        category: 'Rick and Morty',
        prompt: ['Reimagine [show/movie/scene] as a chaotic adult sci-fi cartoon with sharp outlines, exaggerated expressions, surreal props, strange background details, and irreverent animated energy.'],
        note: 'Best for absurd sci-fi reinterpretations and comedic weirdness.',
        image: assetUrl('style-09-rick-and-morty.png')
      },
      {
        title: '1970s Japanese Anime Movie',
        category: 'Anime',
        prompt: ['Reimagine [show/movie/scene] as a classic 1970s Japanese anime movie with dramatic lighting, painted backgrounds, expressive eyes, cinematic framing, and vintage film texture.'],
        note: 'Best for emotional, cinematic scenes with retro anime atmosphere.',
        image: assetUrl('style-10-anime.png')
      },
      {
        title: 'Green-Tinted Cyberpunk Matrix',
        category: 'Matrix Bonus',
        prompt: ['Reimagine [show/movie/scene] as a green-tinted cyberpunk action film with leather outfits, digital rain atmosphere, fluorescent lighting, slow-motion tension, and hacker-movie mood.'],
        note: 'Best for dark cinematic action, tech-noir mood, and dramatic reinventions.',
        image: assetUrl('style-11-matrix.png')
      }
    ]
  }
]

const iconCopy = '<svg class="btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
const iconCheck = '<svg class="check-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'

const routeToLibrary = () => {
  const id = window.location.hash.replace(/^#\/?/, '')
  if (!id || id === 'hub') return null
  return libraries.find(library => library.id === id)
}

const getVisitorBadgeUrl = libraryId => {
  const path = encodeURIComponent(`chatgptricks.fun/${libraryId}`)
  return `https://api.visitorbadge.io/api/visitors?path=${path}`
}

const createCopyButton = index => {
  const copyButton = document.createElement('button')
  copyButton.className = 'copy-btn'
  copyButton.type = 'button'
  copyButton.setAttribute('aria-label', `Copy prompt ${index + 1}`)
  copyButton.innerHTML = `${iconCopy}${iconCheck}<span>Copy Prompt</span>`
  return copyButton
}

const createToolbar = index => {
  const toolbar = document.createElement('div')
  toolbar.className = 'chatgpt-toolbar'
  toolbar.innerHTML = `
    <div class="toolbar-actions">
      <button class="toolbar-btn" tabindex="-1" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>
      <button class="toolbar-btn" tabindex="-1" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </button>
      <button class="toolbar-btn" tabindex="-1" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
      </button>
    </div>
  `
  toolbar.append(createCopyButton(index))
  return toolbar
}

const createImageSlot = (prompt, index) => {
  const slot = document.createElement('div')
  slot.className = 'image-slot'

  if (prompt.images?.length) {
    slot.classList.add('image-gallery')
    slot.dataset.galleryIndex = '0'
    slot.dataset.galleryTotal = prompt.images.length
    slot.dataset.images = JSON.stringify(prompt.images)

    const image = document.createElement('img')
    image.src = prompt.images[0]
    image.alt = `${prompt.title} example 1 of ${prompt.images.length}`

    const controls = document.createElement('div')
    controls.className = 'gallery-controls'
    controls.innerHTML = `
      <button class="gallery-btn" type="button" data-gallery-action="prev" aria-label="Previous image">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <span class="gallery-count">1 / ${prompt.images.length}</span>
      <button class="gallery-btn" type="button" data-gallery-action="next" aria-label="Next image">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    `

    slot.append(image, controls)
    return slot
  }

  if (prompt.image) {
    const image = document.createElement('img')
    image.src = prompt.image
    image.alt = prompt.title
    slot.append(image)
    return slot
  }

  const label = document.createElement('span')
  label.textContent = `Image placeholder ${index + 1}`

  const hint = document.createElement('small')
  hint.textContent = 'Add final example image later'

  slot.append(label, hint)
  return slot
}

const appendHighlightedPromptText = (paragraph, text) => {
  const parts = text.split(/(\[[^\]]+\])/g)

  parts.forEach(part => {
    if (!part) return

    if (part.startsWith('[') && part.endsWith(']')) {
      const tag = document.createElement('span')
      tag.className = 'prompt-tag'
      tag.textContent = part
      paragraph.append(tag)
      return
    }

    paragraph.append(document.createTextNode(part))
  })
}

const makePromptCard = (library, prompt, index) => {
  const card = document.createElement('article')
  const hasVisual = Boolean(prompt.image || prompt.images?.length)
  card.className = `prompt-card ${hasVisual ? 'prompt-card-with-image' : ''}`

  const header = document.createElement('div')
  header.className = 'prompt-header'

  const number = document.createElement('span')
  number.className = 'prompt-number'
  number.textContent = index + 1

  const headingWrap = document.createElement('div')

  if (prompt.category) {
    const category = document.createElement('p')
    category.className = 'prompt-category'
    category.textContent = prompt.category
    headingWrap.append(category)
  }

  const heading = document.createElement('h2')
  heading.textContent = prompt.title
  headingWrap.append(heading)
  header.append(number, headingWrap)

  const input = document.createElement('div')
  input.className = 'chatgpt-input'

  const body = document.createElement('div')
  body.className = 'prompt-body'
  prompt.prompt.forEach(line => {
    const paragraph = document.createElement('p')
    appendHighlightedPromptText(paragraph, line)
    body.append(paragraph)
  })

  input.append(body, createToolbar(index))

  const note = document.createElement('p')
  note.className = 'prompt-note'
  note.textContent = prompt.note

  const content = document.createElement('div')
  content.className = 'prompt-content'
  content.append(header, input, note)

  if (hasVisual) {
    card.append(createImageSlot(prompt, index), content)
  } else {
    card.append(content)
  }

  return card
}

const makeLandingTile = library => {
  const link = document.createElement('a')
  link.className = `landing-tile ${library.accent}`
  link.href = `#/${library.id}`

  const top = document.createElement('div')
  top.className = 'tile-topline'

  const count = document.createElement('span')
  count.textContent = `${library.prompts.length} prompts`

  const arrow = document.createElement('span')
  arrow.className = 'tile-arrow'
  arrow.setAttribute('aria-hidden', 'true')
  arrow.textContent = 'Open'

  top.append(count, arrow)

  const title = document.createElement('strong')
  title.textContent = library.name

  const summary = document.createElement('p')
  summary.textContent = library.summary

  const orbit = document.createElement('div')
  orbit.className = 'tile-orbit'
  orbit.setAttribute('aria-hidden', 'true')

  link.append(top, title, summary, orbit)
  return link
}

const renderLanding = () => {
  const app = document.querySelector('#app')
  app.className = 'landing-shell'
  document.title = 'chatgptricks.fun | Prompt Library Hub'

  app.innerHTML = `
    <main class="landing">
      <div class="motion-field" aria-hidden="true">
        <div class="particle-cloud particle-cloud-one"></div>
        <div class="particle-cloud particle-cloud-two"></div>
        <div class="particle-cloud particle-cloud-three"></div>
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <section class="landing-content">
        <p class="domain-mark">chatgptricks.fun</p>
        <h1>Prompt libraries for faster creative work.</h1>
        <p class="landing-subtitle">Pick a library and jump straight into copy-ready prompts.</p>
        <nav class="landing-actions" aria-label="Prompt libraries"></nav>
      </section>
    </main>
  `

  const actions = app.querySelector('.landing-actions')
  libraries.forEach(library => actions.append(makeLandingTile(library)))
}

const renderLibrary = library => {
  const app = document.querySelector('#app')
  app.className = 'library-shell'
  document.title = `${library.title} | chatgptricks.fun`
  const visitorBadgeUrl = getVisitorBadgeUrl(library.id)

  app.innerHTML = `
    <header class="library-page-header">
      <a class="home-link" href="#/hub" aria-label="Back to prompt hub">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        Hub
      </a>
      <div>
        <p class="domain-mark small">chatgptricks.fun</p>
        <h1>${library.title}</h1>
        <p>${library.description}</p>
      </div>
      <nav class="sibling-nav" aria-label="Other libraries"></nav>
    </header>
    <main class="prompts-container" id="promptsContainer"></main>
    <footer class="conclusion">
      <div class="conclusion-content">
        <h3>${library.tipsTitle}</h3>
        <ul class="recommendations">
          ${library.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
      </div>
    </footer>
    <aside class="visit-counter" aria-label="${library.name} visit counter">
      <img src="${visitorBadgeUrl}" alt="${library.name} visitor counter" loading="lazy" referrerpolicy="no-referrer" />
    </aside>
  `

  const siblingNav = app.querySelector('.sibling-nav')
  libraries.forEach(item => {
    const link = document.createElement('a')
    link.href = `#/${item.id}`
    link.textContent = item.shortName
    link.className = item.id === library.id ? 'active' : ''
    siblingNav.append(link)
  })

  const container = app.querySelector('#promptsContainer')
  library.prompts.forEach((prompt, index) => {
    container.append(makePromptCard(library, prompt, index))
  })
}

const renderRoute = () => {
  const library = routeToLibrary()
  if (library) {
    renderLibrary(library)
  } else {
    renderLanding()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderRoute()

  window.addEventListener('hashchange', renderRoute)

  document.body.addEventListener('click', async event => {
    const galleryButton = event.target.closest('.gallery-btn')
    if (galleryButton) {
      const gallery = galleryButton.closest('.image-gallery')
      const images = JSON.parse(gallery.dataset.images)
      const direction = galleryButton.dataset.galleryAction === 'next' ? 1 : -1
      const nextIndex = (Number(gallery.dataset.galleryIndex) + direction + images.length) % images.length
      const image = gallery.querySelector('img')
      const count = gallery.querySelector('.gallery-count')

      gallery.dataset.galleryIndex = String(nextIndex)
      image.src = images[nextIndex]
      image.alt = `${gallery.closest('.prompt-card').querySelector('h2').textContent} example ${nextIndex + 1} of ${images.length}`
      count.textContent = `${nextIndex + 1} / ${images.length}`
      return
    }

    const button = event.target.closest('.copy-btn')
    if (!button) return

    const card = button.closest('.prompt-card')
    const promptBody = card.querySelector('.prompt-body')
    const textToCopy = Array.from(promptBody.querySelectorAll('p'))
      .map(paragraph => paragraph.textContent)
      .join('\n\n')
    const label = button.querySelector('span')
    const originalText = label.textContent

    try {
      await navigator.clipboard.writeText(textToCopy)
      label.textContent = 'Copied!'
      button.classList.add('copied')

      setTimeout(() => {
        label.textContent = originalText
        button.classList.remove('copied')
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      label.textContent = 'Failed'
      setTimeout(() => {
        label.textContent = originalText
      }, 2000)
    }
  })
})
