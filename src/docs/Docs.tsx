import { ObservableDocs } from './observable/Observable.docs';
import { MakeObservableDocs } from './makeObservable/make.observable.docs';
import { AutorunDocs } from './autorun/Autorun.docs';
import { ObserverDocs } from './observer/Observer.docs';

export function Docs() {
  return (
    <main id="docs" className="paper with-border rounded no-padding flexible column with-space">
      <div className='paper'>
        <h6>Api</h6>
      </div>
      <ObservableDocs/>
      <hr/>
      <MakeObservableDocs/>
      <hr/>
      <AutorunDocs/>
      <hr/>
      <ObserverDocs/>
    </main>
  )
}

