export function Footer() {
  return (
    <div className='grid with-large-space'>
      <div className='xl-2 lg-2 md-2 sm-none xs-none'>&nbsp;</div>
      <div className="xl-8 lg-8 md-8 sm-12 xs-12 grid with-space paper">
        <div className='xl-4 lg-4 md-4 sm-6 xs-12'>
          <small>© {new Date().getFullYear()} Roman Konstantin</small><br />
          <a href='mailto: kroman@observable.ru'>
            <small>kroman@observable.ru</small>
          </a>
        </div>
        <div className='xl-4 lg-4 md-4 sm-6 xs-12'>
          <a href='https://github.com/nihil-pro/kr-observable'>
            <small>Github</small>
          </a><br/>
          <a href='https://www.npmjs.com/package/kr-observable'>
            <small>NPM</small>
          </a>
        </div>
      </div>
      <div className='xl-2 lg-2 md-2 sm-none xs-none'>&nbsp;</div>
    </div>
  )
}