import { ThemeToggle } from './Theme.toggle';

export function Header() {
  return (
    <nav className='paper rounded with-shadow with-border flexible justify-between align-center'>
      <div>
        🔝
      </div>
      <div className="flexible align-center with-space">
        <a href='#'>GitHub</a>
        <a href='#docs'>Docs</a>
        <a href='#examples'>Examples</a>
      </div>
      <ThemeToggle />
    </nav>
  )
}