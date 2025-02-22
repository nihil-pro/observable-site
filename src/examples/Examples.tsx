import { CounterExample } from './Counter.example';
import { AsyncExample } from './Async.example';
import { BatchingExample } from './Batching.example';

export function Examples() {
  return (
    <main id="examples" className="paper rounded with-shadow flexible column with-large-space">
      <h2>Examples</h2>
      <CounterExample />
      <AsyncExample />
      <BatchingExample />
    </main>
  )
}