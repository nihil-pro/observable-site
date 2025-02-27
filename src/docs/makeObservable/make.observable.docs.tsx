import { Highlighter } from '../../Highliter';

const makeObservableSyntax = `import { makeObservable } from 'kr-observable';
          
const state = makeObservable(target)
`

const IgnoreSyntax = `import { makeObservable } from 'kr-observable';
          
const raw = { 
  id: '',
  name: ''
}
const user = makeObservable(raw, ['id'])
`

const preferClasses= 'https://github.com/nihil-pro/kr-observable/wiki/Why-is-it-better-to-use-classes%3F'
const plainObject = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer'

export function MakeObservableDocs() {
  return (
    <div id='makeObservable' className='flexible column with-space'>
      <div className="flexible column with-space paper">
        <h4 className='primary-color thin-text'>makeObservable</h4>
        <p>A function which convert a plain object to <em><a href="#Observable">Observable</a></em>.</p>
      </div>
      <code className="flexible column with-small-space">
        <b>Syntax</b>
        <pre ref={Highlighter.highlight}>
            {makeObservableSyntax}
          </pre>
      </code>

      <div className='paper flexible column with-space'>
        <details>
          <summary><b>Arguments</b></summary>
          <div className="quote paper flexible column with-space">
            <div className="primary-color">target<sup className="error-color">*</sup></div>
            <p>
              An Object that should be converted to <em>Observable</em>. Only <a href={plainObject}>plain
              objects</a> are
              supported.
            </p>

            <div className="primary-color">ignore</div>
            <p>
              An array of properties in target that should be ignored.
              These properties won't be made observable. <a href="#listener">Listeners</a> and <a
              href="#subscriber">subscribers</a> won't be notified about changes.
            </p>
          </div>
        </details>

        <details>
          <summary><b>Return value</b></summary>
          <div className="quote paper">
            <em><a href="#Observable">Observable</a></em>
          </div>
        </details>

        <details>
          <summary><b>Example</b></summary>
          <div className='flexible full-width'>
            <code className='full-width'>
            <pre ref={Highlighter.highlight}>
              {IgnoreSyntax}
            </pre>
            </code>
          </div>
        </details>
      </div>

      <div className="paper">
        <p>See also: <a href={preferClasses}>Why is it better to use classes</a>.</p>
      </div>
    </div>
  )
}