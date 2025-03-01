function ThemeIcon() {
  return (
    <svg fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10m1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z"></path>
    </svg>
  )
}


export function ThemeToggle() {
  // const checked = window.matchMedia('(prefers-color-scheme: dark)').matches
  return (
    <label id='theme-toggle'>
      <ThemeIcon />
      <input
        id='theme'
        type='checkbox'
        checked={false}
      />
    </label>
  )
}