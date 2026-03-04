// components/SearchBar.jsx
import { useState, useEffect, useRef } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search...",
  onSearch,
  debounceTime = 300,
  filters = []
}) {
  const [inputValue, setInputValue] = useState(value || '')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const inputRef = useRef(null)
  const filtersRef = useRef(null)
  const debounceTimeout = useRef(null)

  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  useEffect(() => {
    // Debounce search
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      if (onChange) {
        onChange(inputValue)
      }
      if (onSearch) {
        onSearch(inputValue, selectedFilter)
      }
    }, debounceTime)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [inputValue, selectedFilter, debounceTime, onChange, onSearch])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFilters(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClear = () => {
    setInputValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear()
    }
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue, selectedFilter)
    }
  }

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter.value)
    setShowFilters(false)
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {filters.length > 0 && (
          <div className={styles.filterWrapper} ref={filtersRef}>
            <button
              className={styles.filterButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {selectedFilter !== 'all' && (
                <span className={styles.filterBadge}></span>
              )}
            </button>

            {showFilters && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterHeader}>
                  <span className={styles.filterTitle}>Filter by</span>
                  <button 
                    className={styles.filterClose}
                    onClick={() => setShowFilters(false)}
                  >
                    ✕
                  </button>
                </div>
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`${styles.filterOption} ${selectedFilter === filter.value ? styles.active : ''}`}
                    onClick={() => handleFilterSelect(filter)}
                  >
                    {filter.label}
                    {filter.count !== undefined && (
                      <span className={styles.filterCount}>{filter.count}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {inputValue && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {onSearch && (
          <button
            className={styles.searchButton}
            onClick={() => onSearch(inputValue, selectedFilter)}
          >
            Search
          </button>
        )}
      </div>

      {inputValue && (
        <div className={styles.searchHint}>
          Press <kbd>Enter</kbd> to search, <kbd>ESC</kbd> to clear
        </div>
      )}
    </div>
  )
}