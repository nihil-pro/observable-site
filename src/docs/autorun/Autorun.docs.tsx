import { Highlighter } from '../../Highliter';

const makeObservableSyntax = `import { autorun } from 'kr-observable';
          
autorun(effect)
const dispose = autorun(effect)
`

export function AutorunDocs() {
  return (
    <div id='autorun' className='flexible column with-large-space'>

      <div className="flexible column with-space">
        <h3>autorun</h3>
        <p>
          The autorun register a function, that will be immediately called once,
          and then – every time anything it observes changes.
        </p>
        <b>Syntax</b>
        <code>
            <pre ref={Highlighter.highlight}>
              {makeObservableSyntax}
            </pre>
        </code>
      </div>

      <details>
        <summary><b>Arguments</b></summary>
        <div className="quote paper flexible column with-space">
          <div className="primary-color">effect<sup className="error-color">*</sup></div>
          <p>A function that should run every time anything it observes changes.</p>
          <p>
            During the execution of effect, autorun will automatically subscribe to all observables and computed values
            that are directly or indirectly read by effect.
            Once they changes, the autorun will trigger effect again, repeating the entire process.
          </p>
          <p>
            ☞ You can safely mutate state inside effect – nothing will break.
          </p>
        </div>
      </details>

      <details>
        <summary><b>Return value</b></summary>
        <div className="quote paper">
          A <em>disposer</em> function that, when called, stops tracking observables and unsubscribes from them.
        </div>
      </details>
      <div>See also: <a href='#examples'>examples</a></div>
    </div>
  )
}