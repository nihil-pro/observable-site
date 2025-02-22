import { SANDBOX_PARAMS } from './constants';

export function CounterExample() {
  return (
    <div id='counter-example' className='flexible column with-small-space'>
      <h4>Counter</h4>
      <p>
        ☞ Take a look at <em>Counter.one</em>, <em>Counter.two</em>, and <em>Counter.three</em>.<br/>
        These examples demonstrate that the state can be changed from <b>anywhere</b> and <b>in any way</b>.
      </p>
      <iframe
        className='codesandbox'
        src={`https://codesandbox.io/embed/8thj39${SANDBOX_PARAMS}&module=%2Fsrc%2FCounter.one.tsx`}
        title="kr-observable-counter"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  )
}