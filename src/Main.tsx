import { Highlighter } from './Highliter';

const example = `import { Observable, observer } from 'kr-observable'

class Counter extends Observable {
  count = 0;
  increase() { ++this.count; }
  decrease() { --this.count; }
}

const counter = new Counter()

function App() {
  return (
    <div>
      <button onClick={counter.decrease}>-</button>
      <div>{counter.count}</div>
      <button onClick={counter.increase}>+</button>
    </div>
  )
}
export default observer(App)
`

export function Main() {
  return (
    <main className='flexible column with-small-space paper rounded with-border no-padding'>
      <div className='flexible column with-space paper'>
        <h4>What is Observable?</h4>
        <p>
          Observable adds reactivity to&nbsp;your JavaScript with the easiest <a href="#docs">API</a> and the <a
          href="#least-boilerplate">least boilerplate</a>.
        </p>
      </div>
      <code>
        <pre ref={Highlighter.highlight}>
          {example}
        </pre>
      </code>
      <div className="paper">
        <a href="https://codesandbox.io/p/sandbox/62lt5q">
          <small>Demo on codesandbox</small>
        </a>
      </div>
    </main>
  )
}