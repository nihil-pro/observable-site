import { Highlighter } from '../Highliter';

const syncBatch = `import { Observable } from 'kr-observable'

class State extents Observable {
  a = 1
  b = 1
  c = 1
}

const state = new State()

function effect() {
  console.log('effect was executed')
}

function listener(property) {
  console.log(property, ' where changed')
}

state.listen(listener)
state.subscribe(effect, new Set(['a', 'b', 'c']))

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(2), 50)
  })
}
`

const syncChange = `function change() {
  state.a = 2
  state.b = 2
  state.c = 2
}
change()
`

const async1awaitChange = `async function change() {
  state.a = await delay()
  state.b = 2
  state.c = 2
}
change()
`

const async2awaitChange = `async function change() {
  state.a = await delay()
  state.b = await delay()
  state.c = 2
}
change()
`

const async2awaitFixedChange = `async function change() {
  const a = await delay()
  const b = await delay()
  state.a = a
  state.b = b
  state.c = 2
}
change()
`

export function Batching() {
  return (
    <div className='paper rounded with-shadow with-border flexible column with-large-space'>
      <h3>Batching</h3>
      <p>
        Batching is a mechanism that allows to run <em>effect</em> only once, for changes that were made almost at the
        same time.<br/>
        ☞ <em>Effect</em> is a function which were passed to <a href='#subscribe'>subscribe</a>, <a href='#autorun'>autorun</a> or <a href='#observer'>observer</a>.
      </p>

      <div className="grid with-large-space">
        <div className="xl-4 lg-4 md-4 sm-12 xs-12 flexible column with-space">
          <p>
            Let's make some preparations before we get into how it works.
          </p>
          <p>
            We'll need:<br/>
            – An observable with three properties: <em>a</em>, <em>b</em> and <em>c</em><br/>
            – A listener which will log all changes<br/>
            – A subscriber which should be invoked when <em>a</em>, <em>b</em> or <em>c</em> changes<br/>
            – A delay function which will emulate async requests
          </p>
          <p>
            Finally we'll change the <em>a</em>, <em>b</em> and <em>c</em> on a change function in different ways.
          </p>
        </div>
        <code className="xl-8 lg-8 md-8 sm-12 xs-12">
          <pre ref={Highlighter.highlight}>
            {syncBatch}
          </pre>
        </code>
      </div>

      <div className="grid with-space">

        <code className="xl-6 lg-6 md-12 sm-12 xs-12 grid with-space ">
          <div className="span-12">
            <small>
              Changes are made at same time, and effect will run once.
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{syncChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            🔥 effect was executed<br/>
          </pre>
        </code>

        <code className="xl-6 lg-6 md-12 sm-12 xs-12 grid with-large-space">
          <div className="span-12">
            <small>
              Async function with await statement, but since changes starts after promise is resolved,
              they are made at same time, and effect will run once.
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async1awaitChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            🔥 effect was executed<br/>
          </pre>
        </code>
      </div>
      <div className='grid'>
        <div className='xl-4 lg-4 md-12 sm-12 xs-12 paper flexible column with-space'>
          <p>Why <em>effect</em> is invoked twice?</p>
          <p>
            Because assignment value to "b" property is deferred by "await" statement to the next tick,
            but changes are considered made at the same time, if they happen in the same tick.
          </p>
          <p>Now that we understand how batching works, we can easy control it.</p>
          <p>Let's fix that</p>
        </div>
        <code className="xl-8 lg-8 md-12 sm-12 xs-12 grid with-large-space">
          <div className="span-12">
            <small>
              Async function with two or more await statements.
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async2awaitChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            🔥 effect was executed<br/>
            b were changed<br/>
            c were changed<br/>
            🔥 effect was executed<br/>
          </pre>
        </code>
      </div>

      <div className='grid'>
        <code className="xl-8 lg-8 md-12 sm-12 xs-12 grid with-large-space">
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async2awaitFixedChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            🔥 effect was executed<br/>
          </pre>
        </code>

        <div className='xl-4 lg-4 md-12 sm-12 xs-12 paper flexible column with-space'>
          <p>☞ Nothing break if you won't control batching</p>
          <p>
            But understanding how it works will help reduce the number of <em>unnecessary</em> renders to zero, for example.
          </p>
        </div>
      </div>
    </div>
  )
}