import { Header } from './navigation/Header';
import { Fragment } from 'react';
import { Docs } from './docs/Docs';
import { Main } from './Main';
import { DocsNavigation } from './docs/Docs.navigation';
import { Principles } from './principles/Principles';
import { Batching } from './batching/Batching';
import { Footer } from './navigation/Footer';
import { Computed } from './computed/Computed.docs';


export function App() {
  setTimeout(() => {
    if (location.hash) {
      document
        .getElementById(location.hash.replace('#', ''))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  },20)

  return (
    <Fragment>
      <Header/>
      <div className="app flexible column with-large-space" style={{ marginTop: '1rem' }}>
        <div className="grid with-large-space">
          <div className="xl-3 lg-3 md-3 sm-none xs-none">
            <DocsNavigation/>
          </div>
          <section className="xl-9 lg-9 md-9 sm-12 xs-12 flexible column with-large-space">
            <Main/>
            <hr/>
            <Docs/>
            <hr/>
            <Batching/>
            <hr/>
            <Computed />
            <hr/>
            <Principles/>
          </section>
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}