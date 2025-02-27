import { Highlighter } from '../Highliter';


const react = `// React.js
const [state, setState] = useState({ foo: 'bar' });
setState(prev => ({ ...prev, foo: 'baz' }))

// Solid.js
const [state, setState] = createStore({ foo: 'bar' });
setState(prev => ({ ...prev, foo: 'baz' }))

// Zustand
const { getState, setState } = createStore((set) => ({ foo: 'bar' }))
setState(prev => ({ ...prev, foo: 'baz' }))

// Mobx
const state = observable({ foo: 'bar' })
// "action" is another form of "setter"
action(() => state.foo = 'baz')
`

const observable = `class State extends Observable {
  static staticProperty = []
  #privateProperty = ''
  publicProperty = ''
  
  publicMethod() {
     // ...
  }
  
  #privateMethod() {
    // ...
  }
  
  async #privateAsyncMethod() {
     // ...
  }
  
  static async method() {
    // ...
  }
}
`

const makeObservable = `const state = makeObservable({ foo: 'bar' })

state.foo = 'baz' // set
console.log(state.foo) // read
`

const preferClasses = 'https://github.com/nihil-pro/kr-observable/wiki/Why-is-it-better-to-use-classes%3F'


export function Principles() {
  return (
    <div id="least-boilerplate" className='paper rounded with-border no-padding flexible column with-space'>
      <div className="flexible column with-space paper">
        <h3>Least boilerplate</h3>
        <div className='flexible column with-small-space'>
          <p>
            It&nbsp;is&nbsp;achieved by&nbsp;fact, that You are able to&nbsp;mutate the state from anywhere and however
            you want.
          </p>
        </div>
      </div>
      <code className="flexible column with-small-space">
        <b>Observable</b>
        <pre ref={Highlighter.highlight}>
          {makeObservable}
        </pre>
      </code>
      <code className='flexible column with-small-space'>
        <b>Others</b>
        <pre ref={Highlighter.highlight}>
          {react}
        </pre>
      </code>
      <div className="flexible column with-small-space paper">
        <p>
          Also, many of&nbsp;known libraries can work only with plain objects,
          but with Observable you can use the power of&nbsp;ES6&nbsp;classes.
        </p>
      </div>
      <code>
        <pre ref={Highlighter.highlight}>
          {observable}
        </pre>
      </code>
      <div className='paper'>
        <p>
          Classes are <a href={preferClasses}>much cooler</a>!
        </p>
      </div>
    </div>
  )
}