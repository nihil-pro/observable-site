import { Highlighter } from '../Highliter';


const react = `// React.js
const [state, setState] = useState({ foo: 'bar' });
setState({foo: 'baz'})

// Solid.js
const [state, setState] = createStore({ foo: 'bar' });
setState({foo: 'baz'})

// Zustand
const { getState, setState } = createStore((set) => ({ foo: 'bar' }))
setState({foo: 'baz'})

// Mobx
const state = observable({ foo: 'bar' })
action(() => state.foo = 'baz') // "action" is another form of "setter"
`

const observable = `const state = new class extends Observable {
  foo = 'bar'
}

state.foo = 'baz' // set
console.log(state.foo) // read
`

const makeObservable = `const state = makeObservable({ foo: 'bar' })

state.foo = 'baz' // set
console.log(state.foo) // read
`

const preferClasses= 'https://github.com/nihil-pro/kr-observable/wiki/Why-is-it-better-to-use-classes%3F'


export function Principles() {
  return (
    <div id="principles" className='paper rounded with-shadow with-border flexible column with-large-space'>
      <div id="principles-description" className="flexible column with-space">
        <h3>Least boilerplate</h3>
        <div className="flexible column with-small-space">
          <p>
            It is achieved by fact, that You are able to mutate the state from anywhere and however you want.
          </p>
          <p>
            All known libraries for state management use the concept of getter/setter pair:
          </p>
        </div>
        <div className="flexible with-space align-center">
          <code className="full-width">
          <pre ref={Highlighter.highlight}>
            {react}
          </pre>
          </code>
        </div>
        <div className="flexible column with-small-space">
          <p>Observable – doesn't.</p>
          <p>It is a normal JavaScript object, and you can work with it as you would normally:</p>
        </div>
        <code>
            <pre ref={Highlighter.highlight}>
              {observable}
            </pre>
        </code>
        <p>
          If you don't like classes, you can use plain objects as well:
        </p>
        <code>
            <pre ref={Highlighter.highlight}>
              {makeObservable}
            </pre>
        </code>
        <p>
          But classes are <a href={preferClasses}>much cooler</a>!
        </p>
      </div>
    </div>
  )
}