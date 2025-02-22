import { ChangeEvent } from 'react';

export class ThemeChangeEvent extends CustomEvent<boolean> {
  constructor(detail: boolean) {
    super('theme', { detail });
    document.dispatchEvent(this)
  }
}


function dispatchThemeChangeEvent(event: ChangeEvent<HTMLInputElement>) {
  new ThemeChangeEvent(event.target.checked)
}

export function ThemeToggle() {
  const checked = window.matchMedia('(prefers-color-scheme: dark)').matches
  return (
    <label id='theme-toggle'>
      ☀
      <input
        id='theme'
        type='checkbox'
        checked={false}
        onChange={dispatchThemeChangeEvent}
      />
    </label>
  )
}