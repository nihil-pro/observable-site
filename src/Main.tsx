export function Main() {
  return (
    <main id="main" className='flexible column align-center with-large-space paper rounded with-shadow'>
      <div className="title">
        <h1>Observable</h1>
        <p>Adds reactivity power to your JavaScript</p>
      </div>

      <div className='grid with-large-space' style={{ marginTop: '2rem' }}>
        <section className='xl-4 lg-4 md-12 sm-12 xs-12 flexible column align-center justify-center'>
          <h4>Easiest API</h4>
          <p>You don't even have to learn it.</p>
          <p>See <a href='#docs'>docs</a> to make sure.</p>
        </section>

        <section className='xl-4 lg-4 md-6 sm-12 xs-12 flexible column align-center justify-center'>
          <h4>Least boilerplate</h4>
          <p>It's beyond words.</p>
          <p>Better look at this <a href='#principles'>example</a>.</p>
        </section>

        <section className='xl-4 lg-4 md-6 sm-12 xs-12 flexible column align-center justify-center'>
          <h4>Most friendly</h4>
          <p>Don't restrict how you write code.</p>
          <p>Write as you like.</p>
        </section>
      </div>
    </main>
  )
}