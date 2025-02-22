import { Highlighter } from '../../Highliter';

const preact = 'https://preactjs.com/guide/v10/switching-to-preact/#setting-up-compat'

const observerSyntax = `import { observer } from 'kr-observable';
          
const Component = observer(fc)
`

const observerExample = `import { observer } from 'kr-observable';
          
const ListItem = observer(function listItem({ post }) {
  return (
    <div>{post.title}</div>
  )
})
`

export function ObserverDocs() {
  return (
    <div id='observer' className='flexible column with-large-space'>

      <div className="flexible column with-space">
        <h3>observer</h3>
        <p>
          Is used to binding <a href='https://react.dev/'>React</a>. Is also well tested with <a
          href={preact}>Preact/compat</a>.
        </p>
        <p>
          The observer converts a React component into a reactive component, which tracks observables and re-renders the
          component when one of these changes.
          Can only be used with functional components.
        </p>

        <b>Syntax</b>
        <code>
            <pre ref={Highlighter.highlight}>
              {observerSyntax}
            </pre>
        </code>
      </div>

      <details>
        <summary><b>Arguments</b></summary>
        <div className="quote paper flexible column with-space">
          <div className="primary-color">component<sup className="error-color">*</sup></div>
          <p>A function that returns a functional component.</p>
          <div className="primary-color">debug</div>
          <p>
            A Boolean that when is true enables logging.
            Observable will print to console info about each render/re-render including reasons.
          </p>
          <p>
            ☞ <em>Avoid using arrow functions with observer, that will make logs more readable.</em>
          </p>
        </div>
      </details>

      <details>
        <summary><b>Return value</b></summary>
        <div className="quote paper">
          <p>React functional component</p>
        </div>
      </details>

      <details>
        <summary><b>Example</b></summary>
        <code>
          <pre ref={Highlighter.highlight}>
            {observerExample}
          </pre>
        </code>
      </details>

      <div>See also: <a href='#examples'>examples</a></div>
    </div>
  )
}