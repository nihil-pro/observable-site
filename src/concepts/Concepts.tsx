import { Computed } from './computed/Computed.docs';
import { Batching } from './batching/Batching';

export function Concepts() {
  return (
    <main id="docs" className="paper with-border rounded no-padding flexible column with-space">
      <div className='paper'>
        <h6>Concepts</h6>
      </div>
      <Computed />
      <hr/>
      <Batching/>
    </main>
  )
}