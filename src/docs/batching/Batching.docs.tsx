
const makeObservableSyntax = `import { autorun } from 'kr-observable';
          
autorun(effect)
const dispose = autorun(effect)
`

export function BatchingDocs() {
  return (
    <div id='autorun' className='flexible column with-large-space' style={{ marginTop: '2rem' }}>

      <div className="flexible column with-space">
        <h4>Batching</h4>
        <p>
          The autorun register a function, that will be immediately called once,
          and then – every time anything it observes changes.
        </p>

        {/*<details>*/}
        {/*  <summary><b>Syntax</b></summary>*/}
        {/*  <div ref={ref => CodeHighlighter.highLight(makeObservableSyntax, ref)}/>*/}
        {/*</details>*/}
      </div>

    </div>
  )
}