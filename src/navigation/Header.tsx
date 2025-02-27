import { ThemeToggle } from './Theme.toggle';
import { GithubIcon } from './Github.icon';

function scrollToTop() {
  document.documentElement.scrollIntoView( { block: 'start', behavior: 'smooth' })
}

export function Header() {
  return (
    <nav className='flexible justify-between align-center'>
      <div style={{ cursor: 'pointer' }} className="h5 primary-color" onClick={scrollToTop}>
        Observable
      </div>
      <div className='flexible with-space align-center'>
        <a style={{ color: 'CanvasText' }} className='icon extra-lite' href='https://github.com/nihil-pro/kr-observable'>
          <GithubIcon/>
        </a>
        {/*<ThemeToggle/>*/}
      </div>
    </nav>
  )
}