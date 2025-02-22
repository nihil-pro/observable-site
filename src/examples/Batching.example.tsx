import { SANDBOX_PARAMS } from './constants';

export function BatchingExample() {
  return (
    <div id='batching-example' className='flexible column with-small-space'>
      <div className='flexible column with-small-space'>
        <h4>Batching</h4>
        <p>
          ☞ Take a look at <em>Batch</em>, <em>Breached.batch.one</em> and <em>Breached.batch.two</em> <br/>
          These examples demonstrates how «batching» work.
        </p>
        <iframe
          className='codesandbox'
          src={`https://codesandbox.io/embed/wqdhqf${SANDBOX_PARAMS}&module=%2Fsrc%2FBatch.ts`}
          title="kr-observable-batching"
        />
      </div>

    </div>
  )
}