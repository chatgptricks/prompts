import { Search, X } from 'lucide-react'

export default function SearchBox({ value, onChange, placeholder = 'Search prompts, tags, or workflows', className = '' }) {
  return (
    <label className={`search-box ${className}`}>
      <Search aria-hidden="true" size={19} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {value ? (
        <button type="button" className="icon-button ghost" onClick={() => onChange('')} aria-label="Clear search">
          <X aria-hidden="true" size={16} />
        </button>
      ) : null}
    </label>
  )
}
