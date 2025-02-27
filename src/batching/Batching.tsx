import { Highlighter } from '../Highliter';

const syncBatch = `import { Observable } from 'kr-observable'

class State extents Observable {
  a = 1
  b = 1
  c = 1
}

const state = new State()

// should be invoked when a, b or c changes
function reaction() {
  console.log('run reaction')
}

// will log all changes is state
function listener(property) {
  console.log(property, ' where changed')
}

state.listen(listener)
state.subscribe(effect, new Set(['a', 'b', 'c']))

// will emulate async requests
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
    <div id='Batching' className='paper rounded no-padding with-border flexible column with-space'>
      <div className="paper flexible column with-space">
        <h3>Batching</h3>
        <p>
          Batching allows to&nbsp;invoke <em>Reaction</em>&nbsp;&mdash; only once,
          for changes that were made <em>almost</em> at&nbsp;the same time.
        </p>
        <p>
        ☞ Any function which were passed to <a href="#subscribe">subscribe</a>, <a href="#autorun">autorun</a> or <a href="#observer">observer</a> is called <em>Reaction</em>.
        </p>
        <p>Let&rsquo;s make some preparations before we&nbsp;get into how it&nbsp;works.</p>
      </div>
      <code className="full-width">
        <pre ref={Highlighter.highlight}>
          {syncBatch}
        </pre>
      </code>
      <div className="paper">
        <p>
          Now we&rsquo;ll change state in&nbsp;different ways to&nbsp;understand and control &laquo;batching&raquo;.
        </p>
      </div>

      <div className="grid with-space">
        <code className="span-12 grid with-small-space ">
          <div className="span-12">
            <small>
              Here changes are made at same time, and reaction will run once
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{syncChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            run reaction 👌
          </pre>
        </code>
        <code className="span-12 grid with-small-space">
          <div className="span-12">
            <small>
              Here changes are made in&nbsp;an&nbsp;async function with await statement,
              but since changes starts after promise is&nbsp;resolved,
              they are made at&nbsp;same time, and effect will run once
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async1awaitChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            run reaction 👌
          </pre>
        </code>
        <code className="span-12 grid with-small-space">
          <div className="span-12">
            <small>
              Here changes are made in&nbsp;an&nbsp;async function with <b>more</b> than one await statement during
              assignment
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async2awaitChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            🔥 run reaction 🔥<br/>
            b were changed<br/>
            c were changed<br/>
            run reaction 👌
          </pre>
        </code>
        <div className="span-12 paper flexible column with-space">
          <p>Why <em>Reaction</em> was invoked twice?</p>
          <p>
            That&rsquo;s because assignment value to&nbsp;property &laquo;b&raquo;,
            was deferred by&nbsp;&laquo;await&raquo; statement to&nbsp;the <b>next tick</b>,
            but changes are considered made at&nbsp;the same time,
            if&nbsp;they happen in&nbsp;the <b>same tick</b>.
          </p>
          <p>Now that we&nbsp;understand how batching works, we&nbsp;can easy control&nbsp;it.</p>
          <p>Let's fix that</p>
        </div>
        <code className="span-12 grid with-small-space">
          <div className="span-12">
            <small>
              Here we wait until promises resolves, and then make changes
            </small>
          </div>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12" ref={Highlighter.highlight}>{async2awaitFixedChange}</pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            a were changed<br/>
            b were changed<br/>
            c were changed<br/>
            run reaction 👌
          </pre>
        </code>
        <div className='span-12 paper flexible column with-space'>
          <p>☞ Nothing break if&nbsp;you won&rsquo;t control batching</p>
          <p>
            But knowledge how it&nbsp;works, can help you, for example,
            to&nbsp;reduce the number of&nbsp;<em>unnecessary</em> renders in&nbsp;React to&nbsp;zero.
          </p>
        </div>
      </div>
    </div>
  )
}
