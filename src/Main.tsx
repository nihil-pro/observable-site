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
      <div className='paper flexible with-small-space wrap'>
        <a href="https://www.npmjs.com/package/kr-observable" rel="nofollow">
          <img
          src="https://camo.githubusercontent.com/63bbb9388d15a8b5d7ebf0e1cc33792be4a884609de53c117a18c612f4778eda/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6b722d6f627365727661626c65"
          alt="npm" data-canonical-src="https://img.shields.io/npm/v/kr-observable" />
        </a>
        <a href="https://bundlephobia.com/package/kr-observable" rel="nofollow">
          <img src="https://github.com/nihil-pro/observable-class/raw/main/assets/esm.svg" alt="size-esm"/>
        </a>
        <a href="https://bundlephobia.com/package/kr-observable" rel="nofollow">
          <img src="https://github.com/nihil-pro/observable-class/raw/main/assets/cjs.svg" alt="size-cjs"/>
        </a>
      </div>
    </main>
  )
}