import { SANDBOX_PARAMS } from './constants';

export function AsyncExample() {
  return (
    <div id='async-example' className='flexible column with-small-space'>
      <h4>Asynchronous processes</h4>
      <p>
        ☞ Take a look at <em>User.state.one</em> and <em>User.state.two</em>.<br/>
        These examples demonstrate that asynchronous processes don't need any special treatment in Observable.<br/>
      </p>
      <iframe
        className='codesandbox'
        src={`https://codesandbox.io/embed/pqpwrp${SANDBOX_PARAMS}&module=%2Fsrc%2FUser.state.one.ts`}
        title="kr-observable-async"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  )
}