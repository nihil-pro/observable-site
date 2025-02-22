import { Header } from './navigation/Header';
import { Fragment } from 'react';
import { Examples } from './examples/Examples';
import { Docs } from './docs/Docs';
import { Main } from './Main';
import { DocsNavigation } from './docs/Docs.navigation';
import { Highlighter } from './Highliter';
import { Principles } from './principles/Principles';
import { Batching } from './batching/Batching';

const makeObservableSyntax = `import { autorun } from 'kr-observable';
Math.floor()
new Observable()
autorun(effect)
const dispose = autorun(effect)

async search() {
  try {
    this.loading = true
    const response = await fetch('/someApi')
    this.results = await response.json()
  } catch(e) {
    console.warn(e)
  } finally {
    this.loading = false
  }
}

`

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

      <div className="flexible column with-large-space" style={{ marginTop: '1rem' }}>

        <Main/>

        <div className="grid with-large-space paper rounded with-shadow">
          <div className="xl-3 lg-3 md-3 sm-none xs-none">
            <DocsNavigation/>
          </div>
          <section className="xl-9 lg-9 md-9 sm-12 xs-12">
            <Docs/>
          </section>
        </div>
      </div>

      <Batching />

      <Principles/>

      {/*<div className="with-large-space paper rounded with-shadow with-border">*/}
      {/*  */}
      {/*</div>*/}

    </Fragment>
  )
}