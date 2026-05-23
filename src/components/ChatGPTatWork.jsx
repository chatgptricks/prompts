import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  BookOpen,
  Brain,
  Check,
  Compass,
  Copy,
  Cpu,
  Download,
  HelpCircle,
  Layers,
  Lightbulb,
  ListTodo,
  Search,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import promptsData from '../data/prompts_data.json'

export default function ChatGPTatWork() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedPromptId, setCopiedPromptId] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [activeSandboxTab, setActiveSandboxTab] = useState('optimized')

  // Categories mapping
  const categories = [
    { id: 'all', label: 'All Prompt Templates' },
    { id: 'Marketing & Sales', label: 'Marketing & Sales' },
    { id: 'Customer Support', label: 'Customer Support' },
    { id: 'Productivity & Operations', label: 'Productivity & Ops' },
    { id: 'HR & Team', label: 'HR & Team' },
    { id: 'Writing & Content', label: 'Writing & Content' },
  ]

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return promptsData.prompts.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  // Copy helper
  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedPromptId(id)
    setTimeout(() => setCopiedPromptId(null), 2000)
  }

  // Client-side PDF Generation & Print Download
  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      const printWindow = window.open('', '_blank')
      
      let htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>100+ Ways to Try ChatGPT - ChatGPTricks Guide</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
                color: #1f2937;
                background-color: #ffffff;
                margin: 40px;
                line-height: 1.5;
                font-size: 14px;
              }
              header {
                border-bottom: 3px solid #00ac80;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              header h1 {
                font-size: 32px;
                font-weight: 900;
                color: #111827;
                margin: 0 0 8px 0;
                letter-spacing: -0.02em;
              }
              header p {
                font-size: 16px;
                color: #4b5563;
                margin: 0;
              }
              h2 {
                font-size: 22px;
                font-weight: 800;
                color: #111827;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 8px;
                margin-top: 40px;
                margin-bottom: 20px;
              }
              .workflow-card {
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 18px;
                background-color: #f9fafb;
              }
              .workflow-title {
                font-size: 16px;
                font-weight: 800;
                color: #00ac80;
                margin-bottom: 10px;
              }
              .workflow-prompt {
                font-family: monospace;
                font-size: 13px;
                background: #f3f4f6;
                padding: 12px;
                border-radius: 6px;
                border-left: 4px solid #00ac80;
                margin: 0;
              }
              .prompt-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                font-size: 13px;
              }
              .prompt-table th, .prompt-table td {
                border: 1px solid #e5e7eb;
                padding: 12px;
                text-align: left;
                vertical-align: top;
              }
              .prompt-table th {
                background-color: #f3f4f6;
                font-weight: 800;
                color: #1f2937;
              }
              .prompt-num {
                font-weight: 800;
                color: #00ac80;
                font-family: monospace;
              }
              @media print {
                body { margin: 20px; }
                .workflow-card { page-break-inside: avoid; }
                tr { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <header>
              <h1>ChatGPTricks: 100+ Ways to Try ChatGPT</h1>
              <p>Exclusive Workspace Guide & Prompt Pack (2026 Edition)</p>
            </header>

            <h2>5 Project-Based Workflows</h2>
      `

      promptsData.workflows.forEach((wf) => {
        htmlContent += `
          <div class="workflow-card">
            <div class="workflow-title">Workflow ${wf.id}: ${wf.title}</div>
            <pre class="workflow-prompt">"${wf.prompt}"</pre>
          </div>
        `
      })

      htmlContent += `
            <div style="page-break-before: always;"></div>
            <h2>100 Ways to Try ChatGPT (Core Prompt Templates)</h2>
            <table class="prompt-table">
              <thead>
                <tr>
                  <th style="width: 8%">ID</th>
                  <th style="width: 25%">Title</th>
                  <th>Prompt Template</th>
                  <th style="width: 20%">Category</th>
                </tr>
              </thead>
              <tbody>
      `

      promptsData.prompts.forEach((p) => {
        htmlContent += `
          <tr>
            <td class="prompt-num">#${p.id}</td>
            <td><strong>${p.title}</strong></td>
            <td><em>"${p.prompt}"</em></td>
            <td>${p.category}</td>
          </tr>
        `
      })

      htmlContent += `
              </tbody>
            </table>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 500);
              }
            </script>
          </body>
        </html>
      `

      printWindow.document.write(htmlContent)
      printWindow.document.close()
      setDownloading(false)
    }, 1200)
  }

  const scrollSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="page chatgpt-work-page">
      <style>{`
        .chatgpt-work-page {
          --brand-teal: #00ac80;
          --brand-teal-glow: rgba(0, 172, 128, 0.15);
          --brand-teal-rgb: 0, 172, 128;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif;
          max-width: 1760px;
          width: 95%;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
          color: var(--text);
          background-color: #030508;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .chatgpt-work-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at 50% 25%, black 65%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at 50% 25%, black 65%, transparent 100%);
          z-index: 0;
          pointer-events: none;
        }

        /* Hero Widescreen Dashboard */
        .guide-hero {
          position: relative;
          background: rgba(8, 12, 18, 0.55);
          backdrop-filter: blur(35px);
          border: 1px solid rgba(0, 172, 128, 0.45);
          box-shadow: 0 0 70px rgba(0, 172, 128, 0.18), inset 0 0 40px rgba(0, 172, 128, 0.05);
          border-radius: 20px;
          padding: 4.5rem clamp(2.5rem, 6vw, 6rem);
          overflow: hidden;
          margin-bottom: 2.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--brand-teal-glow);
          border: 1px solid rgba(0, 172, 128, 0.35);
          color: var(--brand-teal);
          padding: 0.5rem 1rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.8rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .guide-hero h1 {
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          line-height: 1.05;
          font-weight: 900;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 30%, #00ac80 70%, #53c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .guide-hero p.intro-desc {
          font-size: clamp(1.1rem, 1.4vw, 1.35rem);
          color: var(--muted);
          max-width: 880px;
          margin: 0 0 3rem 0;
          line-height: 1.6;
        }

        /* Stats Row */
        .hero-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
          margin-top: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--brand-teal);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--muted);
        }

        /* Interactive Roadmap Navigator */
        .roadmap-container {
          margin-bottom: 4rem;
        }

        .roadmap-title {
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .roadmap-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .roadmap-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .roadmap-grid {
            grid-template-columns: repeat(7, 1fr);
          }
        }

        .roadmap-card {
          background: rgba(14, 19, 27, 0.4);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .roadmap-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
          pointer-events: none;
        }

        .roadmap-card * {
          position: relative;
          z-index: 1;
        }

        .roadmap-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .roadmap-card:hover::before {
          opacity: 1;
        }

        .roadmap-card span.chapter-num {
          font-size: 0.8rem;
          font-weight: 800;
          font-family: monospace;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          width: fit-content;
          margin-bottom: 0.75rem;
          display: inline-block;
          letter-spacing: 0.03em;
        }

        .roadmap-card h4 {
          font-size: 0.92rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        /* Unique Chapter Gradient Auras and Custom Color Themes */
        .card-ch1::before { background: linear-gradient(180deg, transparent, rgba(0, 172, 128, 0.12)); }
        .card-ch1:hover { border-color: rgba(0, 172, 128, 0.45); box-shadow: 0 15px 35px rgba(0, 172, 128, 0.15); }
        .card-ch1 span.chapter-num { color: #00ac80; background: rgba(0, 172, 128, 0.12); border: 1px solid rgba(0, 172, 128, 0.25); }

        .card-ch2::before { background: linear-gradient(180deg, transparent, rgba(5, 196, 144, 0.12)); }
        .card-ch2:hover { border-color: rgba(5, 196, 144, 0.45); box-shadow: 0 15px 35px rgba(5, 196, 144, 0.15); }
        .card-ch2 span.chapter-num { color: #05c490; background: rgba(5, 196, 144, 0.12); border: 1px solid rgba(5, 196, 144, 0.25); }

        .card-ch3::before { background: linear-gradient(180deg, transparent, rgba(83, 200, 255, 0.12)); }
        .card-ch3:hover { border-color: rgba(83, 200, 255, 0.45); box-shadow: 0 15px 35px rgba(83, 200, 255, 0.15); }
        .card-ch3 span.chapter-num { color: #53c8ff; background: rgba(83, 200, 255, 0.12); border: 1px solid rgba(83, 200, 255, 0.25); }

        .card-ch4::before { background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.12)); }
        .card-ch4:hover { border-color: rgba(59, 130, 246, 0.45); box-shadow: 0 15px 35px rgba(59, 130, 246, 0.15); }
        .card-ch4 span.chapter-num { color: #3b82f6; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); }

        .card-ch5::before { background: linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.12)); }
        .card-ch5:hover { border-color: rgba(99, 102, 241, 0.45); box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15); }
        .card-ch5 span.chapter-num { color: #6366f1; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); }

        .card-ch6::before { background: linear-gradient(180deg, transparent, rgba(169, 139, 255, 0.12)); }
        .card-ch6:hover { border-color: rgba(169, 139, 255, 0.45); box-shadow: 0 15px 35px rgba(169, 139, 255, 0.15); }
        .card-ch6 span.chapter-num { color: #a98bff; background: rgba(169, 139, 255, 0.12); border: 1px solid rgba(169, 139, 255, 0.25); }

        .card-ch7::before { background: linear-gradient(180deg, transparent, rgba(246, 185, 79, 0.12)); }
        .card-ch7:hover { border-color: rgba(246, 185, 79, 0.45); box-shadow: 0 15px 35px rgba(246, 185, 79, 0.15); }
        .card-ch7 span.chapter-num { color: #f6b94f; background: rgba(246, 185, 79, 0.12); border: 1px solid rgba(246, 185, 79, 0.25); }

        /* Widescreen Fluid Grid and Card Layouts */
        .widescreen-dashboard-box {
          background: rgba(14, 19, 27, 0.38);
          backdrop-filter: blur(24px);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 2.5rem;
          margin-top: 2rem;
          margin-bottom: 4.5rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        }

        .widescreen-dashboard-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .widescreen-dashboard-header h3 {
          margin: 0;
          font-size: 1.45rem;
          color: #fff;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .widescreen-dashboard-desc {
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0 0 2.2rem 0;
          max-width: 1100px;
        }

        /* Responsive 5-column dashboard grid for ultra-widescreens */
        .widescreen-dashboard-grid-5 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .widescreen-dashboard-grid-5 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .widescreen-dashboard-grid-5 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1400px) {
          .widescreen-dashboard-grid-5 {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        /* Responsive 4-column dashboard grid for ultra-widescreens */
        .widescreen-dashboard-grid-4 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .widescreen-dashboard-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .widescreen-dashboard-grid-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Glowing card in dashboard grids */
        .widescreen-grid-card {
          background: rgba(3, 5, 8, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.8rem;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .widescreen-grid-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-teal), #53c8ff);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .widescreen-grid-card:hover {
          border-color: rgba(var(--brand-teal-rgb), 0.35);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 172, 128, 0.08);
          background: rgba(3, 5, 8, 0.7);
        }

        .widescreen-grid-card:hover::before {
          opacity: 1;
        }

        .widescreen-grid-card .card-badge {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--brand-teal);
          font-family: monospace;
          background: var(--brand-teal-glow);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 1.2rem;
          border: 1px solid rgba(0, 172, 128, 0.15);
        }

        .widescreen-grid-card h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.01em;
        }

        .widescreen-grid-card p {
          margin: 0;
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.55;
        }

        .prose-wide {
          max-width: 1200px;
          margin-bottom: 2rem;
        }

        /* Chapter Title */
        .chapter-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 1.8rem 0;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
        }

        .chapter-title svg {
          color: var(--brand-teal);
        }

        /* Prose text */
        .prose p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--soft);
          margin-top: 0;
          margin-bottom: 1.5rem;
        }

        .prose strong {
          color: #fff;
          font-weight: 600;
        }

        .prose h3 {
          font-size: 1.45rem;
          font-weight: 800;
          color: #fff;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .prose ul {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }

        .prose li {
          margin-bottom: 0.75rem;
          color: var(--soft);
          line-height: 1.65;
          font-size: 1.05rem;
        }

        .prose li strong {
          color: var(--brand-teal);
        }

        /* Premium Interactive Compare Sandbox */
        .compare-playground {
          background: rgba(14, 19, 27, 0.65);
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
          margin-top: 2rem;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
        }

        .playground-header {
          background: rgba(8, 12, 18, 0.8);
          border-bottom: 1px solid var(--line);
          padding: 1.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .playground-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .playground-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .playground-meta h4 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
        }

        .playground-toggle-group {
          display: flex;
          background: rgba(3, 5, 8, 0.6);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 0.25rem;
        }

        .playground-toggle-btn {
          border: 0;
          background: transparent;
          color: var(--muted);
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .playground-toggle-btn.active-bad {
          background: rgba(255, 77, 95, 0.15);
          color: #ff4d5f;
        }

        .playground-toggle-btn.active-good {
          background: var(--brand-teal);
          color: #030508;
        }

        .playground-body {
          padding: 2.2rem;
        }

        .sandbox-card {
          position: relative;
          border-radius: 16px;
          border: 1px solid transparent;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sandbox-card.bad {
          background: linear-gradient(180deg, rgba(255, 77, 95, 0.04) 0%, rgba(255, 77, 95, 0.01) 100%);
          border-color: rgba(255, 77, 95, 0.2);
          box-shadow: 0 10px 40px rgba(255, 77, 95, 0.03);
        }

        .sandbox-card.good {
          background: linear-gradient(180deg, rgba(0, 172, 128, 0.04) 0%, rgba(0, 172, 128, 0.01) 100%);
          border-color: rgba(0, 172, 128, 0.22);
          box-shadow: 0 10px 40px rgba(0, 172, 128, 0.03);
        }

        .sandbox-card-header {
          padding: 1.25rem 1.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          background: rgba(3, 5, 8, 0.35);
        }

        /* High-fidelity Mac terminal dot triggers */
        .sandbox-card-header::before {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff5f56;
          box-shadow: 16px 0 0 #ffbd2e, 32px 0 0 #27c93f;
          margin-right: 2.5rem;
          flex-shrink: 0;
        }

        .sandbox-card-header h5 {
          margin: 0;
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .sandbox-card-header.bad h5 { color: #ff4d5f; }
        .sandbox-card-header.good h5 { color: var(--brand-teal); }

        .sandbox-card-body {
          padding: 1.8rem;
        }

        .prompt-code-display {
          background: rgba(3, 5, 8, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          padding: 1.8rem;
          font-family: "SF Mono", Menlo, Monaco, Consolas, monospace;
          font-size: 1rem;
          line-height: 1.6;
          color: #fff;
          margin-bottom: 1.5rem;
          white-space: pre-wrap;
          word-break: break-word;
          position: relative;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.4);
        }

        .sandbox-analysis {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .sandbox-analysis p {
          margin: 0;
          color: var(--soft);
        }

        .sandbox-analysis p strong {
          color: #fff;
        }

        /* 10 Best Practices Layout */
        .practices-board {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .practice-board-card {
          background: rgba(14, 19, 27, 0.35);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .practice-board-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 172, 128, 0.1), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
          pointer-events: none;
        }

        .practice-board-card:hover::before {
          opacity: 1;
        }

        .practice-board-card:hover {
          border-color: rgba(0, 172, 128, 0.35);
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 20px 45px rgba(0, 172, 128, 0.12);
        }

        .practice-card-num {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--brand-teal-glow);
          border: 1px solid rgba(0, 172, 128, 0.3);
          color: var(--brand-teal);
          font-weight: 800;
          font-family: monospace;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .practice-card-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          color: #fff;
          font-weight: 800;
        }

        .practice-card-content p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.5;
        }

        /* 2026 Features Widescreen Grid */
        .widescreen-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .glowing-feature-card {
          background: linear-gradient(180deg, rgba(14, 19, 27, 0.75) 0%, rgba(8, 12, 18, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 2.2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glowing-feature-card:hover {
          border-color: rgba(var(--brand-teal-rgb), 0.45);
          transform: translateY(-5px);
          box-shadow: 0 20px 45px rgba(0, 172, 128, 0.15);
        }

        .glowing-feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-teal), #53c8ff);
          opacity: 0.8;
        }

        .feature-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--brand-teal-glow);
          border: 1px solid rgba(0, 172, 128, 0.35);
          color: var(--brand-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 172, 128, 0.1);
        }

        .glowing-feature-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.01em;
        }

        .glowing-feature-card p {
          margin: 0;
          font-size: 0.95rem;
          color: var(--soft);
          line-height: 1.6;
        }

        /* 100 Prompt Explorer Widescreen Container */
        .widescreen-explorer {
          background: rgba(14, 19, 27, 0.40);
          backdrop-filter: blur(24px);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: clamp(1.5rem, 4vw, 3rem);
          margin-top: 4rem;
          box-shadow: 0 35px 120px rgba(0, 0, 0, 0.55);
        }

        .explorer-header-section {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 2rem;
          margin-bottom: 3rem;
        }

        .explorer-toolbar-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        @media (min-width: 1024px) {
          .explorer-toolbar-grid {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .search-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(3, 5, 8, 0.8);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 0 1.25rem;
          height: 52px;
          width: 100%;
          max-width: 480px;
          transition: all 0.22s;
        }

        .search-field-wrapper:focus-within {
          border-color: var(--brand-teal);
          box-shadow: 0 0 0 3px var(--brand-teal-glow);
        }

        .search-field-icon {
          color: var(--muted);
          margin-right: 0.9rem;
          flex-shrink: 0;
        }

        .search-field-input {
          background: transparent;
          border: 0;
          outline: 0;
          width: 100%;
          color: #fff;
          font-size: 1rem;
        }

        .search-field-input::placeholder {
          color: #5d6e80;
        }

        .explorer-tabs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .category-tab-button {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--line);
          color: var(--soft);
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-tab-button:hover {
          border-color: rgba(var(--brand-teal-rgb), 0.45);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
        }

        .category-tab-button.active {
          background: var(--brand-teal);
          border-color: var(--brand-teal);
          color: #030508;
          box-shadow: 0 4px 20px rgba(0, 172, 128, 0.25);
        }

        /* 5 Pro Workflows Board */
        .workflows-board {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .workflow-board-card {
          background: linear-gradient(135deg, rgba(0, 172, 128, 0.05) 0%, rgba(14, 19, 27, 0.8) 100%);
          border: 1px solid rgba(0, 172, 128, 0.22);
          border-radius: 14px;
          padding: 2rem;
          transition: all 0.25s ease;
        }

        .workflow-board-card:hover {
          border-color: rgba(var(--brand-teal-rgb), 0.5);
          box-shadow: 0 16px 40px rgba(0, 172, 128, 0.08);
          transform: translateY(-2px);
        }

        .wf-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .wf-badge-title {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .wf-badge-num {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--brand-teal);
          background: var(--brand-teal-glow);
          border: 1px solid rgba(0, 172, 128, 0.3);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-family: monospace;
        }

        .wf-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .wf-prompt-box {
          background: rgba(3, 5, 8, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          padding: 1.5rem;
          position: relative;
        }

        .wf-prompt-label {
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          color: var(--brand-teal);
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }

        .wf-prompt-text {
          margin: 0;
          font-size: 0.98rem;
          color: #fff;
          font-style: italic;
          font-family: monospace;
          line-height: 1.5;
        }

        /* 100 Prompts Grid list */
        .widescreen-prompts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .premium-prompt-item-card {
          background: linear-gradient(180deg, rgba(8, 12, 18, 0.6) 0%, rgba(14, 19, 27, 0.7) 100%);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-prompt-item-card:hover {
          border-color: rgba(var(--brand-teal-rgb), 0.35);
          background: linear-gradient(180deg, rgba(14, 19, 27, 0.5) 0%, rgba(0, 172, 128, 0.04) 100%);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .prompt-item-top {
          margin-bottom: 1.5rem;
        }

        .prompt-item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .prompt-item-number {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--brand-teal);
          background: var(--brand-teal-glow);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-family: monospace;
          border: 1px solid rgba(0, 172, 128, 0.2);
        }

        .prompt-item-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .prompt-item-body {
          font-size: 0.95rem;
          color: var(--soft);
          line-height: 1.6;
          margin: 0;
          font-family: "SF Mono", Menlo, Consolas, monospace;
          font-style: italic;
          background: rgba(3, 5, 8, 0.4);
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--brand-teal);
        }

        .prompt-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 1rem;
          margin-top: auto;
        }

        .prompt-item-category {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--muted);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          color: var(--muted);
          text-align: center;
          border: 1px dashed var(--line);
          border-radius: 14px;
          background: rgba(8, 12, 18, 0.3);
        }

        /* Copy Button Premium Styles */
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--line);
          color: var(--soft);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: rgba(var(--brand-teal-rgb), 0.1);
          border-color: rgba(var(--brand-teal-rgb), 0.45);
          color: #fff;
          box-shadow: 0 4px 15px rgba(0, 172, 128, 0.15);
        }

        .copy-btn.copied {
          background: rgba(0, 172, 128, 0.2);
          border-color: var(--brand-teal);
          color: var(--brand-teal);
        }

        /* Widescreen Download Call To Action Box */
        .widescreen-download-section {
          background: linear-gradient(135deg, rgba(0, 172, 128, 0.28) 0%, rgba(3, 5, 8, 0.95) 50%),
                      rgba(14, 19, 27, 0.8);
          border: 1px solid rgba(0, 172, 128, 0.45);
          border-radius: 20px;
          padding: clamp(2.5rem, 5vw, 4.5rem);
          margin-top: 6rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 120px rgba(0, 172, 128, 0.18);
        }

        @media (min-width: 1024px) {
          .widescreen-download-section {
            grid-template-columns: 1.3fr 0.7fr;
          }
        }

        .download-content-wrapper h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 1rem 0;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .download-content-wrapper p {
          color: var(--soft);
          font-size: 1.15rem;
          line-height: 1.65;
          margin: 0;
        }

        .download-action-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
        }

        .premium-download-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          background: var(--brand-teal);
          color: #030508;
          border: 0;
          outline: 0;
          padding: 1.2rem 2.5rem;
          border-radius: 10px;
          font-size: 1.15rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 172, 128, 0.4);
        }

        .premium-download-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 45px rgba(0, 172, 128, 0.65);
          background: #2fe7a3;
        }

        .premium-download-btn:disabled {
          background: rgba(0, 172, 128, 0.55);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .download-subtext {
          font-size: 0.85rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        /* Section-Level Visual Candy: Orbs & Watermarks */
        .section-glow-orb {
          position: absolute;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          filter: blur(140px);
          z-index: -1;
          pointer-events: none;
          opacity: 0.65; /* Highly visible colored aura! */
          animation: drift-orb 28s infinite alternate ease-in-out;
        }

        .orb-hero {
          background: radial-gradient(circle, var(--brand-teal) 0%, transparent 70%);
          top: -200px;
          right: -150px;
        }

        .orb-ch3 {
          background: radial-gradient(circle, #53c8ff 0%, transparent 70%);
          bottom: -200px;
          left: -150px;
          animation-delay: -7s;
        }

        .orb-explorer {
          background: radial-gradient(circle, #a98bff 0%, transparent 70%);
          top: -150px;
          right: -150px;
          animation-delay: -14s;
        }

        .section-watermark {
          position: absolute;
          opacity: 0.32; /* Clearly visible, premium watermark outline! */
          pointer-events: none;
          z-index: -1;
        }

        .watermark-hero {
          top: -80px;
          left: -100px;
          color: var(--brand-teal);
          animation: float-slow-1 25s infinite alternate ease-in-out;
        }

        .watermark-ch3 {
          bottom: -100px;
          right: -100px;
          color: #53c8ff;
          animation: float-slow-2 30s infinite alternate ease-in-out;
        }

        .watermark-explorer {
          top: -120px;
          left: -120px;
          color: #a98bff;
          animation: float-slow-3 28s infinite alternate ease-in-out;
        }

        @keyframes float-slow-1 {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(4deg) scale(1.05); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        
        @keyframes float-slow-2 {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(35px) rotate(-5deg) scale(1.1); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        
        @keyframes float-slow-3 {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(5deg) scale(0.95); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }

        @keyframes drift-orb {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        /* Ensure parent cards clip background watermarks beautifully */
        .guide-hero,
        .guide-section-block,
        .widescreen-explorer,
        .widescreen-download-section {
          position: relative;
          z-index: 3;
          overflow: hidden; /* Neat clipping of glowing layers! */
        }

        .guide-section-block {
          margin-bottom: 5.5rem;
        }
      `}</style>

      {/* Hero Section Widescreen */}
      <header className="guide-hero">
        {/* Section-Nested Decorative Aurora & Floating Watermark */}
        <div className="section-glow-orb orb-hero" />
        <Compass size={400} strokeWidth={0.25} className="section-watermark watermark-hero" />

        <div className="hero-badge">
          <Sparkles size={14} />
          EXCLUSIVE FREEBIE PACK
        </div>
        <h1>Supercharge Your Workday With ChatGPT</h1>
        <p className="intro-desc">
          Your ultimate workspace guide to leveraging ChatGPT's full potential and transforming your workday. Learn to streamline workflows, enhance productivity, drive collaboration, and implement AI best practices with confidence.
        </p>

        {/* Dashboard Stats Row */}
        <div className="hero-stats-row">
          <div className="stat-card">
            <div className="stat-icon"><BookOpen size={20} /></div>
            <div>
              <div className="stat-number">7</div>
              <div className="stat-label">Core Chapters</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Activity size={20} /></div>
            <div>
              <div className="stat-number">5</div>
              <div className="stat-label">Pro Workflows</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Layers size={20} /></div>
            <div>
              <div className="stat-number">100</div>
              <div className="stat-label">Copy Prompts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><ListTodo size={20} /></div>
            <div>
              <div className="stat-number">10</div>
              <div className="stat-label">Best Practices</div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Roadmap Navigator */}
      <section className="roadmap-container">
        <div className="roadmap-title">
          <Compass size={16} className="text-teal" />
          Interactive Roadmap Navigator
        </div>
        <div className="roadmap-grid">
          <div className="roadmap-card card-ch1" onClick={() => scrollSection('ch-1')}>
            <span className="chapter-num">Ch. 1</span>
            <h4>Understanding AI & ChatGPT</h4>
          </div>
          <div className="roadmap-card card-ch2" onClick={() => scrollSection('ch-2')}>
            <span className="chapter-num">Ch. 2</span>
            <h4>Capabilities & Use Cases</h4>
          </div>
          <div className="roadmap-card card-ch3" onClick={() => scrollSection('ch-3')}>
            <span className="chapter-num">Ch. 3</span>
            <h4>Using ChatGPT at Work</h4>
          </div>
          <div className="roadmap-card card-ch4" onClick={() => scrollSection('ch-4')}>
            <span className="chapter-num">Ch. 4</span>
            <h4>Best Practices</h4>
          </div>
          <div className="roadmap-card card-ch5" onClick={() => scrollSection('ch-5')}>
            <span className="chapter-num">Ch. 5</span>
            <h4>Mastering Prompt Eng.</h4>
          </div>
          <div className="roadmap-card card-ch6" onClick={() => scrollSection('ch-6')}>
            <span className="chapter-num">Ch. 6</span>
            <h4>What's New in 2026</h4>
          </div>
          <div className="roadmap-card card-ch7" onClick={() => scrollSection('ch-7')}>
            <span className="chapter-num">Ch. 7</span>
            <h4>100+ Prompt Explorer</h4>
          </div>
        </div>
      </section>

      {/* Content body */}
      <main className="guide-body">
        
        {/* Chapter 1 */}
        {activeChapter === 'ch-1' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-1" className="guide-section-block">
              <h2 className="chapter-title">
                <Brain size={28} />
                1. Understanding AI and ChatGPT
              </h2>
              
              <div className="prose prose-wide">
                <h3>What is AI and how does it work?</h3>
                <p>
                  AI stands for <strong>Artificial Intelligence</strong>, which is a broad term referring to the development of computer systems that can perform tasks that historically required human intelligence. AI can involve various techniques, such as machine learning and natural language processing.
                </p>
                <p>
                  <strong>ChatGPT</strong> is a specific instance of AI that uses a technique called <strong>deep learning</strong>. It’s designed to generate human-like text responses. ChatGPT learns through a two-step process: pretraining and fine-tuning.
                </p>
                <p>
                  During the <strong>pretraining phase</strong>, ChatGPT is exposed to a massive amount of text data from the internet. The model learns to predict what the next word in a sentence or paragraph is based on the context of the preceding text. It uses a technique called unsupervised learning, where it doesn't have explicit labels for the correct answers. Through this process, ChatGPT learns grammar, facts, reasoning abilities, and gains a broad understanding of language.
                </p>
                <p>
                  After pretraining, the model goes through a <strong>fine-tuning stage</strong> using a more specific dataset. The fine-tuning data involves demonstrations and comparisons. Human AI trainers provide conversations where they play both the user and an AI assistant and have access to model-written suggestions. They also rank different responses based on quality. The model is then fine-tuned using this data to improve its responses and align with the desired behavior.
                </p>
                <p>
                  This process helps ChatGPT develop a contextual understanding of language, allowing it to generate more relevant and coherent responses during conversations. It learns from the patterns and examples it has seen in the data and tries to generalize that knowledge to provide useful responses in real-world scenarios.
                </p>
                <p style={{ margin: 0 }}>
                  During a chat conversation, ChatGPT takes in your input message, tokenizes it, and produces a response based on patterns it has learned. It aims to generate relevant and coherent responses based on the context of the conversation history. The model learns from large amounts of data to better understand language and generate more accurate answers. However, it's important to note that ChatGPT may still produce incorrect or nonsensical answers at times, so caution should be exercised when relying on its responses.
                </p>
              </div>

              <div className="widescreen-dashboard-box">
                <div className="widescreen-dashboard-header">
                  <Activity size={18} className="text-teal" />
                  <h3>Everyday AI Applications</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  While ChatGPT is an increasingly common use of artificial intelligence, it is not the first time that AI has been adopted by everyday users. Here are five examples of AI that you’ve likely used before:
                </p>
                
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Virtual Assistants</h4>
                    <p>Virtual assistants like Apple's Siri, Amazon's Alexa, Google Assistant, or Microsoft's Cortana use AI to understand voice commands and perform tasks like setting reminders, answering questions, or controlling smart home devices.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Recommendation Systems</h4>
                    <p>Recommendation systems, used by platforms like Netflix, Spotify, or Amazon, use AI to analyze user preferences, behavior, and historical data to suggest personalized content, products, or services.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Image & Speech</h4>
                    <p>AI enables systems to recognize and interpret images, videos, or speech. This is used in applications like facial recognition, object detection, speech-to-text conversion, and voice assistants.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Autonomous Vehicles</h4>
                    <p>AI plays a crucial role in autonomous vehicles, allowing them to perceive the environment, make decisions, and navigate safely through technologies like computer vision and sensor fusion.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Fraud Detection</h4>
                    <p>AI is used to identify patterns or anomalies in data that may indicate fraudulent activities. It helps detect fraudulent transactions, cybersecurity threats, or suspicious behavior in real time.</p>
                  </div>
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 2 */}
        {activeChapter === 'ch-2' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-2" className="guide-section-block">
              <h2 className="chapter-title">
                <Cpu size={28} />
                2. Capabilities and Use Cases of ChatGPT
              </h2>
              
              <div className="prose prose-wide">
                <p>
                  With its understanding of natural language, ChatGPT is able to comprehend and interpret input in a conversational manner. This, paired with its ease of use and ease of access, makes it a powerful tool that can go far in increasing efficiency and knowledge-building in its users.
                </p>
                <p>
                  ChatGPT maintains context over multiple turns, allowing it to remember and refer back to previous messages for more accurate responses. It excels in answering factual questions, providing explanations, definitions, and assisting with general knowledge inquiries.
                </p>
                <p>
                  There are also different models within the ChatGPT ecosystem, such as <strong>GPT-4 Preview</strong> and <strong>GPT Mini</strong>, each tailored to specific use cases. For instance, GPT-4 Preview is designed for deep, strategic problem-solving and excels at tackling complex, nuanced inquiries that require contextual understanding and advanced reasoning. In contrast, GPT Mini focuses on delivering quick and efficient responses, making it ideal for straightforward tasks or when a lightweight, speedy assistant is needed.
                </p>
                <p>
                  ChatGPT's capabilities and use cases span customer support, content editing, language learning, personal assistance, programming support, and knowledge exploration, making it a versatile tool for enhancing productivity and efficiency in different areas.
                </p>
                <p>
                  While ChatGPT can be a valuable tool, it's crucial to recognize its limitations. It may not possess domain-specific expertise or completely replace human expertise. It's important to consider factors such as contextual understanding and handling sensitive or confidential information when utilizing AI tools like ChatGPT—especially at work.
                </p>
                <p style={{ margin: 0 }}>
                  That being said, leveraging ChatGPT's capabilities can greatly benefit the workplace. It has the potential to streamline workflows, facilitate collaboration, and provide assistance in various work-related tasks. By harnessing its power, organizations can foster a more efficient and productive work environment.
                </p>
              </div>

              <div className="widescreen-dashboard-box">
                <div className="widescreen-dashboard-header">
                  <Layers size={18} className="text-teal" />
                  <h3>10 Ways to Use ChatGPT</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Maximize the value of generative models across diverse personal and professional contexts:
                </p>
                
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Virtual Assistant</h4>
                    <p>Draft email templates, proofread documents, translate articles, summarize texts, or brainstorm keywords.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Personal Concierge</h4>
                    <p>Get personalized recommendations for restaurants, hotels, movies, books, or activities.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Language Practice</h4>
                    <p>Engage in conversations with ChatGPT to practice and improve foreign language skills.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Creative Companion</h4>
                    <p>Use ChatGPT as a writing companion for brainstorming ideas and overcoming writer's block.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Information Retrieval</h4>
                    <p>Seek explanations, quick definitions, or fast information on a colossal range of topics.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">06</span>
                    <h4>Learning & Education</h4>
                    <p>Receive explanations or elaborations on complex subjects, aiding with homework.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">07</span>
                    <h4>Goal Tracking</h4>
                    <p>Track progress towards your goals, get motivational prompts, and stay focused.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">08</span>
                    <h4>Personal Growth</h4>
                    <p>Engage in reflective conversations with ChatGPT to gain insights and foster growth.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">09</span>
                    <h4>Entertainment & Pop</h4>
                    <p>Have interactive discussions, play trivia games, get riddles, or talk pop culture.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">10</span>
                    <h4>Exploration</h4>
                    <p>Delve into specific academic fields, explore interests, and discover new facts.</p>
                  </div>
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 3 */}
        {activeChapter === 'ch-3' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-3" className="guide-section-block">
              {/* Section-Nested Decorative Aurora & Floating Watermark */}
              <div className="section-glow-orb orb-ch3" />
              <Sparkles size={450} strokeWidth={0.2} className="section-watermark watermark-ch3" />

              <h2 className="chapter-title">
                <BookOpen size={28} />
                3. Using ChatGPT at Work
              </h2>
              
              <div className="prose prose-wide">
                <p style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '3rem', maxWidth: '1100px', lineHeight: 1.6 }}>
                  ChatGPT can be a valuable tool to enhance productivity and efficiency in a work environment. Organizations that embrace AI-augmented operations see immediate improvements across every department.
                </p>
              </div>

              {/* How to use - 10 Core Methods */}
              <div className="widescreen-dashboard-box">
                <div className="widescreen-dashboard-header">
                  <Sparkles size={18} className="text-teal" />
                  <h3>10 Core Methods to Use ChatGPT at Work</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Retrieve information, automate tasks, draft reports, and solve operational problems seamlessly with these established methods:
                </p>
                
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Knowledge Retrieval</h4>
                    <p>Retrieve information, definitions, or explanations related to work topics rapidly, saving time spent searching.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Task Management</h4>
                    <p>Serve as a virtual assistant, helping you set reminders, organize checklists, and stay structured during your workday.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Writing & Editing</h4>
                    <p>Draft emails, craft reports, proofread documents, and refine communication for clear, concise correspondence.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Onboarding & Training</h4>
                    <p>Act as a training resource, providing instant answers to common questions and explaining company processes and policies.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Problem-Solving</h4>
                    <p>Brainstorm solutions, explore options, and analyze complex situations to make more informed choices.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">06</span>
                    <h4>Programming Support</h4>
                    <p>Provide coding tips, write boilerplate blocks, troubleshoot syntax bugs, and explain complex technical concepts.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">07</span>
                    <h4>Customer Service</h4>
                    <p>Integrate into service platforms to provide instant assistance, answer FAQs, and lower queues.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">08</span>
                    <h4>Collaboration & Ideas</h4>
                    <p>Generate creative suggestions, explore new angles, and facilitate brainstorming sessions with team members.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">09</span>
                    <h4>Project Management</h4>
                    <p>Track project milestones, draft status updates, and configure scheduled reminders for deadlines.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">10</span>
                    <h4>Employee Well-being</h4>
                    <p>Provide advice and resources related to stress management, work-life balance, and focus strategies.</p>
                  </div>
                </div>
              </div>

              {/* Department Deep Dives - Stunning Widescreen Grid 4 */}
              <div className="prose prose-wide" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
                <h3>Departmental Deep Dives</h3>
                <p style={{ color: 'var(--muted)' }}>Explore how different teams leverage ChatGPT to streamline operations, enhance communication, and accelerate growth.</p>
              </div>

              <div className="widescreen-dashboard-grid-4" style={{ marginBottom: '4.5rem' }}>
                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(0, 172, 128, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper"><Sparkles size={20} /></div>
                  <h4 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0' }}>Sales & Marketing</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--soft)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Engage potential customers, qualify leads proactively, collect data from prospects, and automate personalized interactions on platforms or email campaigns at scale.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.4rem' }}>Lead Generation</strong>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Revamp manual pipeline outreach using natural language intent assessment.</p>
                  </div>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(83, 200, 255, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(83, 200, 255, 0.1)', border: '1px solid rgba(83, 200, 255, 0.3)', color: '#53c8ff' }}><HelpCircle size={20} /></div>
                  <h4 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0' }}>Customer Support</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--soft)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Provide swift, accurate, instant responses to FAQs and integrate AI chatbots to handle recursive tickets so human agents can focus on complex cases.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.4rem' }}>Ticket Resolution</strong>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Lower resolution time and drop queue depth by automating tier-1 FAQs.</p>
                  </div>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(169, 139, 255, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(169, 139, 255, 0.1)', border: '1px solid rgba(169, 139, 255, 0.3)', color: '#a98bff' }}><ListTodo size={20} /></div>
                  <h4 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0' }}>Project Management</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--soft)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Automate task allocations, analyze project requirements, suggest team distributions, monitor progress milestones, and optimize collaboration pipelines.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.4rem' }}>Workflow Optimization</strong>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Integrate direct status checks, flag delays, and map project constraints.</p>
                  </div>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(246, 185, 79, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(246, 185, 79, 0.1)', border: '1px solid rgba(246, 185, 79, 0.3)', color: '#f6b94f' }}><Brain size={20} /></div>
                  <h4 style={{ fontSize: '1.3rem', margin: '0 0 1rem 0' }}>Decision Support</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--soft)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                    Analyze patterns, offer suggestions based on data correlations, support resource allocations, map budget plans, and expedite strategic problem-solving.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block', marginBottom: '0.4rem' }}>Strategic Planning</strong>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>Upskill team knowledge rapidly and access comparative industry trends.</p>
                  </div>
                </div>
              </div>

              {/* Other Industries and Job Functions */}
              <div className="widescreen-dashboard-box" style={{ marginTop: '2.5rem' }}>
                <div className="widescreen-dashboard-header">
                  <Brain size={18} className="text-teal" />
                  <h3>Other Industries &amp; Job Functions</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Beyond core departments, ChatGPT empowers individuals across every role to manage time, amplify learning, and sharpen decisions with AI-backed insights:
                </p>
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Enhanced Decision-Making</h4>
                    <p>Analyze large data sets, identify trends in sales or operations, and surface strategic recommendations based on historical patterns and industry benchmarks.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Personal Virtual Assistant</h4>
                    <p>Find common availability across participants, organize prioritized to-do lists, manage calendar conflicts, and deliver daily agenda briefings on demand.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Time Management</h4>
                    <p>Discuss workloads and deadlines with ChatGPT for timeline suggestions, task prioritization guidance, and reminder systems that keep every responsibility on track.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Decision Support</h4>
                    <p>Get resource allocation guidance, identify project bottlenecks, suggest risk mitigations, and surface solutions grounded in prior data patterns and field best practices.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Personal Development</h4>
                    <p>Access training materials on demand, monitor industry news in real time, explore expert viewpoints, and receive customized skill-development roadmaps tailored to your goals.</p>
                  </div>
                </div>
              </div>

              {/* Overcoming Challenges - Stunning Widescreen Grid 5 */}
              <div className="widescreen-dashboard-box">
                <div className="widescreen-dashboard-header">
                  <Shield size={18} className="text-teal" />
                  <h3>Overcoming Challenges and Limitations</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Using AI technologies like ChatGPT comes with potential challenges. Address these five critical fields to ensure effective and responsible use at work:
                </p>
                
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Feedback & Tuning</h4>
                    <p>AI models like ChatGPT require continuous feedback. Actively collect reviews from users to iterate and refine parameters.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Overcoming Biases</h4>
                    <p>AI models can reflect biases in training data. Mitigate these through careful curation, audits, and checks.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Data Security</h4>
                    <p>Protect sensitive workspace details and ensure compliance. Implement robust access control and encryption policies.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Human Oversight</h4>
                    <p>AI should complement, not replace, human judgment. Establish clear accountability frameworks and review AI decisions.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Ethical Principles</h4>
                    <p>Ensure AI usage aligns with workspace values, focusing on transparency, fairness, privacy, and consent.</p>
                  </div>
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 4 */}
        {activeChapter === 'ch-4' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-4" className="guide-section-block">
              <h2 className="chapter-title">
                <Shield size={28} />
                4. Best Practices for Implementing ChatGPT in Your Work
              </h2>
              
              <div className="prose prose-wide">
                <p style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '3rem', maxWidth: '1100px', lineHeight: 1.6 }}>
                  Integrating ChatGPT into your workplace can be a game-changer for productivity and efficiency. However, to make the most of this powerful tool, it's important to establish some best practices. By following these guidelines, you can ensure accurate and reliable interactions while maintaining user privacy and adhering to company policies. From training and monitoring to feedback and version control, here are the ten essential best practices to optimize your use of ChatGPT in the workplace.
                </p>
              </div>

              {/* 10 Best Practices - Stunning Widescreen Dashboard Grid */}
              <div className="widescreen-dashboard-box">
                <div className="widescreen-dashboard-header">
                  <ListTodo size={18} className="text-teal" />
                  <h3>10 Essential Best Practices</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Operationalize these ten fundamental guidelines across your daily workflows to maximize reliability and outputs:
                </p>
                
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Define your goal</h4>
                    <p>Clearly identify the purpose of using ChatGPT. Whether it's for customer support, content generation, or internal assistance, having a specific goal ensures better utilization.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Train ChatGPT properly</h4>
                    <p>Fine-tune base models using substantial, high-quality, company-specific data. This helps ChatGPT understand workspace context and provide accurate answers.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Set clear guidelines</h4>
                    <p>Establish strict usage guidelines to ensure consistency and regulatory compliance. These should cover acceptable content, tone, and privacy constraints.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Monitor and moderate</h4>
                    <p>Keep a close eye on conversations to ensure accuracy. Implement an active moderation pipeline to flag potential issues or structural biases.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Encourage feedback</h4>
                    <p>Encourage employees to review the quality of answers. Continuous feedback loop helps identify areas for prompt fine-tuning and template updates.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">06</span>
                    <h4>Avoid over-reliance</h4>
                    <p>While ChatGPT is highly capable, never treat it as an absolute ground truth. Users should exercise critical thinking and cross-verify facts.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">07</span>
                    <h4>Maintain user privacy</h4>
                    <p>Protect user privacy by implementing strict data security measures. Never input sensitive or proprietary source code or PII into public models.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">08</span>
                    <h4>Regularly fact-check</h4>
                    <p>Independently verify any critical calculations or professional advice. Cross-reference official databases and rely on experienced teammates.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">09</span>
                    <h4>Establish fallbacks</h4>
                    <p>Prepare alternative operational resources for situations where ChatGPT might fail or produce incomplete or out-of-scope outputs.</p>
                  </div>

                  <div className="widescreen-grid-card">
                    <span className="card-badge">10</span>
                    <h4>Evaluate performance</h4>
                    <p>Continuously track prompt ROI, response accuracy, and workflow times. Use this data to iterate on system instructions and template folders.</p>
                  </div>
                </div>
              </div>

              {/* Sub-panels: side-by-side widescreen layout */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(48%, 1fr))', gap: '2.5rem', marginTop: '4rem' }}>
                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 800 }}>Creating Better Prompts for Optimal Results</h3>
                  <p>The effectiveness of ChatGPT relies heavily on the clarity and structure of your prompts. To guide users in crafting better prompts, focus on including the following elements:</p>
                  
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--soft)' }}>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Provide Context:</strong> Clearly state the situation or background information to help ChatGPT better understand the task. For example, instead of asking, "How do I write a good email?" you could say, "I need to write an email to my team about an upcoming project deadline. Can you provide a professional template for that?"
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Be Specific:</strong> Avoid vague requests and specify exactly what you need. For instance, instead of, "Write something about time management," try, "Can you create a three-paragraph article about time management techniques for busy professionals?"
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                      <strong>Define Outcomes:</strong> If you have a desired structure or tone, make that explicit. For example, "Write a step-by-step guide in a friendly and approachable tone for a blog audience."
                    </li>
                  </ul>
                  <p>By mastering prompt creation, users can generate responses that are more relevant, actionable, and aligned with their needs.</p>
                </div>

                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 800 }}>Advanced Techniques & Troubleshooting</h3>
                  <p>To maximize ChatGPT's potential, consider employing advanced strategies like:</p>
                  
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--soft)' }}>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Iterative Prompting:</strong> If the initial response isn't quite what you need, refine your request. For example, after receiving a general summary, follow up with, "Can you elaborate on point three?" or, "Can you rewrite this in a more formal tone?"
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Breaking Tasks into Smaller Steps:</strong> For complex requests, divide them into manageable chunks. Instead of asking, "Write a comprehensive marketing plan," you might start with, "Outline the main components of a marketing plan," followed by, "Now elaborate on the social media strategy section."
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                      <strong>Prompt Drafting by ChatGPT:</strong> Ask ChatGPT to help craft its own prompts. For instance, you could say, "What information do you need to create a detailed event proposal?" This approach ensures that the AI has all the context it needs to deliver high-quality results.
                    </li>
                  </ul>

                  <h4 style={{ color: '#fff', margin: '1.5rem 0 0.5rem 0', fontWeight: 800 }}>Troubleshooting Tips</h4>
                  <p>Despite its advanced capabilities, ChatGPT might occasionally deliver unsatisfactory results. Reframe your prompts to address common challenges:</p>
                  <ul style={{ paddingLeft: '1.25rem', color: 'var(--soft)', margin: 0 }}>
                    <li style={{ marginBottom: '0.4rem' }}><strong>Clarify Your Prompt:</strong> Review for ambiguity, reframe to be specific, and add context.</li>
                    <li style={{ marginBottom: '0.4rem' }}><strong>Adjust Tone or Depth:</strong> Instruct it to "Provide a detailed explanation" or "Use a professional tone."</li>
                    <li><strong>Recognize Limitations:</strong> Rely on external sources to verify critical information and acknowledge that AI complements, but cannot replace, human judgment.</li>
                  </ul>
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 5 */}
        {/* Chapter 5 */}
        {activeChapter === 'ch-5' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-5" className="guide-section-block">
              <h2 className="chapter-title">
                <Lightbulb size={28} />
                5. Mastering Prompt Engineering
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(48%, 1fr))', gap: '2.5rem' }}>
                <div className="prose">
                  <p>
                    Prompt engineering is the cornerstone of effective interaction with ChatGPT. By crafting precise, structured prompts, you can guide the AI to generate more accurate, actionable, and context-appropriate responses.
                  </p>
                  <h3 style={{ marginTop: '2rem' }}>The Anatomy of a Great Prompt</h3>
                  <p>A well-designed prompt typically includes three essential components:</p>
                  <ol style={{ paddingLeft: '1.25rem', color: 'var(--soft)' }}>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Context:</strong> Provide relevant background information to help ChatGPT understand the scenario.
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                      <strong>Task:</strong> Clearly specify exactly what you want ChatGPT to do.
                    </li>
                    <li style={{ marginBottom: 0 }}>
                      <strong>Details & Constraints:</strong> Add specific requirements such as tone, structural layout, length, or style.
                    </li>
                  </ol>
                </div>

                {/* Compare Sandbox Widescreen */}
                <div className="compare-playground" style={{ height: 'fit-content' }}>
                  <div className="playground-header">
                    <div className="playground-meta">
                      <Lightbulb size={18} style={{ color: 'var(--brand-teal)' }} />
                      <h4>Interactive Prompt Sandbox</h4>
                    </div>
                    <div className="playground-toggle-group">
                      <button
                        onClick={() => setActiveSandboxTab('vague')}
                        className={`playground-toggle-btn ${activeSandboxTab === 'vague' ? 'active-bad' : ''}`}
                      >
                        Vague
                      </button>
                      <button
                        onClick={() => setActiveSandboxTab('optimized')}
                        className={`playground-toggle-btn ${activeSandboxTab === 'optimized' ? 'active-good' : ''}`}
                      >
                        Optimized
                      </button>
                    </div>
                  </div>

                  <div className="playground-body">
                    <AnimatePresence mode="wait">
                      {activeSandboxTab === 'optimized' ? (
                        <motion.div
                          key="optimized"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.22 }}
                          className="sandbox-card good"
                        >
                          <div className="sandbox-card-header good">
                            <h5>Optimized Prompt Structure</h5>
                            <Check size={14} />
                          </div>
                          <div className="sandbox-card-body">
                            <div className="prompt-code-display">
                              "Act as an expert content writer. I need to write a professional email to my client to confirm our upcoming project review meeting. The email should include slots to propose three alternative times, politely request that they share any additional agenda items before Friday, and maintain a respectful yet warm tone. Keep it under 150 words."
                            </div>
                            <div className="sandbox-analysis">
                              <p>
                                <strong>Why it works:</strong> Defines a clear role (expert writer), provides detailed context (email to confirm meeting), specifies structure constraints (three time slots, deadline for agenda), and a clear length limit (under 150 words).
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="vague"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.22 }}
                          className="sandbox-card bad"
                        >
                          <div className="sandbox-card-header bad">
                            <h5>Vague / Ineffective Prompt</h5>
                          </div>
                          <div className="sandbox-card-body">
                            <div className="prompt-code-display" style={{ color: 'rgba(255,255,255,0.7)' }}>
                              "Write an email for a meeting."
                            </div>
                            <div className="sandbox-analysis">
                              <p>
                                <strong>Why it fails:</strong> Lacks any context or detail. The model doesn't know the recipient (client, colleague, friend), the required tone (formal, casual), meeting topic, or expected format. It will produce a generic, flat response.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 6 */}
        {activeChapter === 'ch-6' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-6" className="guide-section-block">
              <h2 className="chapter-title">
                <Zap size={28} />
                6. What's New in 2026
              </h2>
              
              <div className="prose prose-wide">
                <p style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '3rem', maxWidth: '1100px', lineHeight: 1.6 }}>
                  As we navigate through 2026, ChatGPT has undergone its most dramatic evolution since launch—transforming from a clever chatbot into a comprehensive, collaborative AI workspace. Let's look at the game-changing updates making it an indispensable business partner:
                </p>
              </div>

              <div className="widescreen-dashboard-grid-4">
                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(0, 172, 128, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper"><Brain size={20} /></div>
                  <h3>Unified GPT-5.5 System</h3>
                  <p>No more choosing between confusing versions. GPT-5.5 runs on three distinct intelligence modes: Instant (quick tasks), Thinking (deep reasoning with adjustable 'thinking time'), and Pro (demanding, book-length analysis).</p>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(83, 200, 255, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(83, 200, 255, 0.1)', border: '1px solid rgba(83, 200, 255, 0.3)', color: '#53c8ff' }}><Compass size={20} /></div>
                  <h3>Advanced ChatGPT Projects</h3>
                  <p>Organize chats, instructions, and file uploads around specific goals. Create shared spaces where teams collaborate with a unified AI context that understands your brand voice and past decisions.</p>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(169, 139, 255, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(169, 139, 255, 0.1)', border: '1px solid rgba(169, 139, 255, 0.3)', color: '#a98bff' }}><Layers size={20} /></div>
                  <h3>Integrated Company Knowledge</h3>
                  <p>Connect your workspace directly to Slack channels, Google Drive, Notion, Outlook, and Salesforce. ChatGPT retrieves organization-specific insights complete with clickable citations and links, respecting existing permissions.</p>
                </div>

                <div className="widescreen-grid-card" style={{ background: 'linear-gradient(180deg, rgba(246, 185, 79, 0.04) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                  <div className="feature-icon-wrapper" style={{ background: 'rgba(246, 185, 79, 0.1)', border: '1px solid rgba(246, 185, 79, 0.3)', color: '#f6b94f' }}><Zap size={20} /></div>
                  <h3>Agentic AI Workflows</h3>
                  <p>Run scheduled background tasks, execute multi-step research plans with Deep Research, and utilize Autonomous Agents to monitor boards, draft emails, and handle repetitive processes 24/7.</p>
                </div>
              </div>

              {/* GPT-5.5: Three Intelligence Tiers */}
              <div className="widescreen-dashboard-box" style={{ marginTop: '2.5rem' }}>
                <div className="widescreen-dashboard-header">
                  <Brain size={18} className="text-teal" />
                  <h3>GPT-5.5: Three Intelligence Tiers</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Launched December 11, 2025, GPT-5.5 is the first AI to consistently outperform human experts across a broad range of business tasks. Gone are the days of choosing between confusing versions — three unified modes cover every scenario:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div className="widescreen-grid-card" style={{ borderLeft: '3px solid var(--brand-teal)', background: 'linear-gradient(180deg, rgba(0, 172, 128, 0.06) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                    <span className="card-badge">INSTANT</span>
                    <h4>Free Users</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      <li>Lightning-fast responses for everyday tasks</li>
                      <li>Perfect for emails, quick summaries, and routine questions</li>
                      <li>Accessible to everyone — AI assistance made truly universal</li>
                    </ul>
                  </div>
                  <div className="widescreen-grid-card" style={{ borderLeft: '3px solid #53c8ff', background: 'linear-gradient(180deg, rgba(83, 200, 255, 0.06) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                    <span className="card-badge" style={{ color: '#53c8ff', background: 'rgba(83, 200, 255, 0.12)', borderColor: 'rgba(83, 200, 255, 0.25)' }}>THINKING</span>
                    <h4>Plus / Business / Enterprise</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      <li>Deep reasoning with adjustable "thinking time"</li>
                      <li>Choose Light, Standard, Extended, or Heavy modes</li>
                      <li>Ideal for financial modeling, strategic analysis, and complex problem-solving</li>
                    </ul>
                  </div>
                  <div className="widescreen-grid-card" style={{ borderLeft: '3px solid #a98bff', background: 'linear-gradient(180deg, rgba(169, 139, 255, 0.06) 0%, rgba(3, 5, 8, 0.6) 100%)' }}>
                    <span className="card-badge" style={{ color: '#a98bff', background: 'rgba(169, 139, 255, 0.12)', borderColor: 'rgba(169, 139, 255, 0.25)' }}>PRO</span>
                    <h4>Pro / Enterprise Users</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      <li>Maximum capability for the most demanding professional tasks</li>
                      <li>Extended context window for book-length documents</li>
                      <li>Perfect for comprehensive research and multi-faceted projects</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects & Shared Projects */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(48%, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Compass size={18} style={{ color: 'var(--brand-teal)', flexShrink: 0 }} />
                    Projects: Your New Command Center
                  </h3>
                  <p>Instead of scattered conversations, Projects organize work around specific goals with persistent context. How smart teams use them:</p>
                  <div style={{ background: 'rgba(0, 172, 128, 0.06)', border: '1px solid rgba(0, 172, 128, 0.2)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--brand-teal)', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Sales: "Q2 Prospecting" Project</strong>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--soft)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      <li>Upload ICP descriptions, messaging guidelines, and lead CSVs</li>
                      <li>Every team member drops in new prospect lists</li>
                      <li>Get prioritized call scripts, follow-up sequences, and qualification notes</li>
                      <li>All consistent with your brand voice and methodology</li>
                    </ul>
                  </div>
                  <div style={{ background: 'rgba(83, 200, 255, 0.06)', border: '1px solid rgba(83, 200, 255, 0.2)', borderRadius: '10px', padding: '1.25rem' }}>
                    <strong style={{ color: '#53c8ff', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>Support: "Support Playbook" Project</strong>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--soft)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      <li>Include FAQ PDFs, help center exports, and sample tickets</li>
                      <li>Agents get instant, cited responses grounded in your actual policies</li>
                      <li>Draft replies maintain consistency and save hours daily</li>
                    </ul>
                  </div>
                </div>

                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Layers size={18} style={{ color: '#a98bff', flexShrink: 0 }} />
                    Shared Projects: True AI Collaboration
                  </h3>
                  <p>Launched October 2025, Shared Projects let multiple users contribute files, refine instructions, and build on each other's AI interactions:</p>
                  <ul>
                    <li><strong>Cross-plan collaboration:</strong> Free and paid users can work together seamlessly</li>
                    <li><strong>Persistent team context:</strong> AI remembers your team's working style across sessions</li>
                    <li><strong>File sharing with AI context:</strong> Upload once, every team member benefits</li>
                    <li><strong>Collaborative instruction refinement:</strong> Build better AI prompts together over time</li>
                  </ul>
                  <div style={{ background: 'rgba(169, 139, 255, 0.06)', border: '1px solid rgba(169, 139, 255, 0.2)', borderRadius: '10px', padding: '1.25rem', marginTop: '1rem' }}>
                    <strong style={{ color: '#a98bff', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Power User Tip</strong>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--soft)', lineHeight: 1.6 }}>Set up a "Monthly KPI Reporting" shared project with your data templates and reporting standards. Team members upload departmental data, and ChatGPT generates consistent, formatted reports that match your executive presentation style.</p>
                  </div>
                </div>
              </div>

              {/* Company Knowledge */}
              <div className="widescreen-dashboard-box" style={{ marginTop: '2.5rem' }}>
                <div className="widescreen-dashboard-header">
                  <Layers size={18} className="text-teal" />
                  <h3>Company Knowledge: Your Business Brain</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  Available for Business and Enterprise plans, Company Knowledge connects ChatGPT directly to your business systems — delivering organization-specific insights with full citations and source links. Security: ChatGPT only accesses data you already have access to.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>Supported Integrations</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {['Slack Conversations', 'Google Drive', 'SharePoint', 'Gmail & Outlook', 'HubSpot', 'Salesforce', 'Notion / Confluence', 'Zendesk', 'Custom MCP Connectors'].map((intg) => (
                        <span key={intg} style={{ background: 'rgba(0, 172, 128, 0.08)', border: '1px solid rgba(0, 172, 128, 0.2)', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.82rem', color: 'var(--brand-teal)', fontWeight: 700 }}>{intg}</span>
                      ))}
                    </div>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">Example Query</span>
                    <h4>"Give me a brief on Client X before my call"</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      <li>Recent Slack mentions and project updates</li>
                      <li>Latest CRM notes and opportunity status</li>
                      <li>Previous proposal documents from SharePoint</li>
                      <li>Support ticket history and resolution status</li>
                      <li>All with clickable links to source documents</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Agentic AI Details */}
              <div className="widescreen-dashboard-box" style={{ marginTop: '2.5rem' }}>
                <div className="widescreen-dashboard-header">
                  <Zap size={18} className="text-teal" />
                  <h3>Agentic AI: Your 24/7 Assistant</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  ChatGPT's agentic features work autonomously — conducting research, running recurring tasks, and executing multi-step workflows without human intervention:
                </p>
                <div className="widescreen-dashboard-grid-4">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">Deep Research</span>
                    <h4>Long-Form Research Partner</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      <li>Conducts cited research on complex topics using web + internal sources</li>
                      <li>Exports professional PDF reports with full citations</li>
                      <li>Runs autonomously based on your research parameters</li>
                      <li>Example: weekly competitive landscape briefings every Monday</li>
                    </ul>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">Scheduled Tasks</span>
                    <h4>Recurring AI Workflows</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      <li>Weekly support ticket analysis and trend reporting</li>
                      <li>Monthly customer feedback categorization</li>
                      <li>Daily social media content suggestions</li>
                      <li>Quarterly financial data summaries</li>
                    </ul>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">ChatGPT Pulse</span>
                    <h4>Continuous Insight Stream</h4>
                    <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0 0 0', color: 'var(--soft)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      <li>Analyzes your ChatGPT usage patterns continuously</li>
                      <li>Identifies relevant industry developments</li>
                      <li>Surfaces potential opportunities or threats</li>
                      <li>Delivers personalized visual summary dashboards</li>
                    </ul>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">Autonomous Agents</span>
                    <h4>Multi-Step Execution</h4>
                    <p style={{ color: 'var(--soft)', fontSize: '0.88rem', lineHeight: 1.65, margin: '0.75rem 0 0 0' }}>
                      Agents monitor your project board, identify overdue tasks, automatically draft status update emails to stakeholders, and adjust project timelines based on preset parameters — all without human intervention.
                    </p>
                  </div>
                </div>
              </div>

              {/* Memory, Visual Intelligence, Codex */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>Enhanced Memory &amp; Personalization</h3>
                  <p>Important business context stays accessible, less relevant details fade automatically, and frequently-used information surfaces first. Set tone presets — <strong>Friendly, Efficient, Professional, Candid,</strong> or <strong>Quirky</strong> — alongside warmth and formatting sliders. Changes apply immediately across every conversation.</p>
                </div>
                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>Visual Intelligence Revolution</h3>
                  <p>ChatGPT now delivers <strong>inline visuals</strong> for statistics, side panels with highlighted key facts, entities, and companies, interactive charts and data visualizations, and better formatting tuned for mobile and meeting contexts — so you can scan responses instantly during client calls.</p>
                </div>
                <div style={{ background: 'rgba(14, 19, 27, 0.55)', border: '1px solid var(--line)', borderRadius: '16px', padding: '2.5rem' }} className="prose">
                  <h3 style={{ color: '#fff', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 800 }}>Codex: The Developer Platform</h3>
                  <p>OpenAI launched the standalone <strong>Codex macOS app</strong> built for development workflows — with multiple coding agents running in parallel, advanced diff management, background task execution, and reusable coding patterns. Even non-technical teams benefit when colleagues use Codex to automate integrations and build internal tooling.</p>
                </div>
              </div>

              {/* Future-Proofing Your AI Skills */}
              <div className="widescreen-dashboard-box" style={{ marginTop: '2.5rem' }}>
                <div className="widescreen-dashboard-header">
                  <Sparkles size={18} className="text-teal" />
                  <h3>Future-Proofing Your AI Skills</h3>
                </div>
                <p className="widescreen-dashboard-desc">
                  As ChatGPT evolves into a comprehensive business platform, professionals need five new essential competencies to stay ahead:
                </p>
                <div className="widescreen-dashboard-grid-5">
                  <div className="widescreen-grid-card">
                    <span className="card-badge">01</span>
                    <h4>Project Architecture</h4>
                    <p>Structure recurring workflows as Projects rather than one-off chats to build persistent, compounding AI context across your team.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">02</span>
                    <h4>Context Curation</h4>
                    <p>Master writing project-level instructions that provide consistent, useful context to AI across every team interaction and document.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">03</span>
                    <h4>Thinking Time Optimization</h4>
                    <p>Know when to apply Light vs. Extended vs. Heavy reasoning modes based on task complexity and available time constraints.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">04</span>
                    <h4>Collaborative AI Management</h4>
                    <p>Develop skills in managing shared AI resources, standardized instructions, and knowledge bases across distributed teams.</p>
                  </div>
                  <div className="widescreen-grid-card">
                    <span className="card-badge">05</span>
                    <h4>Verification Workflows</h4>
                    <p>Build habits of checking citations and source links, especially for business-critical decisions that rely on AI-generated outputs.</p>
                  </div>
                </div>
              </div>

              {/* What This Means for Your Business */}
              <div style={{ background: 'linear-gradient(135deg, rgba(0, 172, 128, 0.08) 0%, rgba(14, 19, 27, 0.7) 100%)', border: '1px solid rgba(0, 172, 128, 0.25)', borderRadius: '16px', padding: '2.5rem', marginTop: '2.5rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.45rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>What This Means for Your Business</h3>
                <p style={{ color: 'var(--soft)', marginBottom: '1.5rem', lineHeight: 1.65, fontSize: '1.05rem', maxWidth: '900px' }}>
                  The latest developments represent more than feature updates — it's a fundamental shift toward AI-augmented business operations. Organizations that embrace collaborative, agentic workflows will gain significant competitive advantages:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  {[
                    'Faster decision cycles with instant access to organizational knowledge',
                    'Consistent quality through shared AI resources and standardized processes',
                    'Reduced operational overhead via automated research and reporting',
                    'Enhanced team collaboration through AI-mediated knowledge sharing',
                    'Scalable expertise that grows with your business needs',
                  ].map((benefit) => (
                    <div key={benefit} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-teal)', flexShrink: 0, marginTop: '7px' }} />
                      <p style={{ margin: 0, color: 'var(--soft)', fontSize: '1rem', lineHeight: 1.55 }}>{benefit}</p>
                    </div>
                  ))}
                </div>
                <p style={{ margin: 0, color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  Professionals and organizations that master these capabilities won't just work faster — they'll work fundamentally differently, with AI as a true collaborative partner rather than just an advanced search tool.
                </p>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

        {/* Chapter 7 / Interactive prompt explorer WIDESCREEN */}
        {activeChapter === 'ch-7' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <section id="ch-7" className="widescreen-explorer">
              {/* Section-Nested Decorative Aurora & Floating Watermark */}
              <div className="section-glow-orb orb-explorer" />
              <Zap size={450} strokeWidth={0.2} className="section-watermark watermark-explorer" />

              <div className="explorer-header-section">
                <h2 className="chapter-title" style={{ border: 0, paddingBottom: 0, marginBottom: '0.75rem' }}>
                  <Layers size={28} />
                  7. 100+ Prompt Explorer
                </h2>
                <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '900px', lineHeight: 1.6 }}>
                  Explore, search, and copy prompt templates from our official ChatGPTricks freebie guide. Use filters to find prompts for your specific role.
                </p>

                {/* Workflow Spotlight Row */}
                <div style={{ marginTop: '3.5rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={18} className="text-teal" />
                    Highlight: 5 Project-Based Workflows (2026 Edition)
                  </h3>
                  <div className="workflows-board">
                    {promptsData.workflows.map((wf) => (
                      <div key={`wf-${wf.id}`} className="workflow-board-card">
                        <div className="wf-card-top">
                          <div className="wf-badge-title">
                            <span className="wf-badge-num">Workflow {wf.id}</span>
                            <h4 className="wf-card-title">{wf.title}</h4>
                          </div>
                          <button
                            onClick={() => handleCopyText(`Prompt: ${wf.prompt}`, `wf-${wf.id}`)}
                            className={`copy-btn ${copiedPromptId === `wf-${wf.id}` ? 'copied' : ''}`}
                          >
                            {copiedPromptId === `wf-${wf.id}` ? (
                              <>
                                <Check size={14} />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy Prompt
                              </>
                            )}
                          </button>
                        </div>
                        <div className="wf-prompt-box">
                          <div className="wf-prompt-label">Main Prompt</div>
                          <p className="wf-prompt-text">
                            "{wf.prompt}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 100 Prompts Exploration Tool */}
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '3rem', marginTop: '3rem' }}>
                  <ListTodo size={18} className="text-teal" />
                  100 Ways to Try ChatGPT: Core Prompts Pack
                </h3>

                <div className="explorer-toolbar-grid">
                  <div className="search-field-wrapper">
                    <Search size={20} className="search-field-icon" />
                    <input
                      type="text"
                      className="search-field-input"
                      placeholder="Search 100 prompts by keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="explorer-tabs-row">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`category-tab-button ${activeTab === cat.id ? 'active' : ''}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid display with independent scroll container */}
              {filteredPrompts.length > 0 ? (
                <div className="explorer-scroll-container">
                  <div className="widescreen-prompts-grid">
                    {filteredPrompts.map((p) => (
                      <div key={`p-${p.id}`} className="premium-prompt-item-card">
                        <div className="prompt-item-top">
                          <div className="prompt-item-header">
                            <span className="prompt-item-number">#{p.id}</span>
                            <button
                              onClick={() => handleCopyText(`Prompt: ${p.prompt}`, `p-${p.id}`)}
                              className={`copy-btn ${copiedPromptId === `p-${p.id}` ? 'copied' : ''}`}
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                            >
                              {copiedPromptId === `p-${p.id}` ? (
                                <Check size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                          <h4 className="prompt-item-title">{p.title}</h4>
                        </div>
                        
                        <p className="prompt-item-body">
                          "{p.prompt}"
                        </p>

                        <div className="prompt-item-footer">
                          <span className="prompt-item-category">{p.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-results" style={{ marginTop: '1.5rem' }}>
                  <Search size={40} style={{ marginBottom: '1rem', opacity: 0.5, color: 'var(--brand-teal)' }} />
                  <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontWeight: 800 }}>No Prompts Found</h4>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>Try searching for a different keyword or changing the category filter.</p>
                </div>
              )}
            </section>

            {/* Download Widescreen Call To Action */}
            <section className="widescreen-download-section">
              <div className="download-content-wrapper">
                <h2>Get the Complete 100+ Prompt PDF Pack</h2>
                <p>
                  Download the official PDF freebie guide, formatted perfectly for high-quality offline reading, printing, or sharing. Includes all 5 project workflows and 100 categorized workspace prompts.
                </p>
              </div>
              <div className="download-action-box">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="premium-download-btn"
                >
                  {downloading ? (
                    <>
                      <Zap className="animate-spin" size={20} />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download Freebie (.pdf)
                    </>
                  )}
                </button>
                <div className="download-subtext">
                  <Check size={14} className="text-teal" />
                  100% Free PDF Document Download (.pdf)
                </div>
              </div>
            </section>
            {renderPagination()}
          </motion.div>
        )}

      </main>
    </div>
  )
}
