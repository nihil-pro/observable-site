import { ObservableDocs } from './observable/Observable.docs';
import { MakeObservableDocs } from './makeObservable/make.observable.docs';
import { AutorunDocs } from './autorun/Autorun.docs';
import { ObserverDocs } from './observer/Observer.docs';

export function Docs() {
  return (
    <main id="docs" className="flexible column with-large-space">
      <div className='paper with-border rounded'>
        <ObservableDocs/>
      </div>

      <div className='paper with-border rounded'>
        <MakeObservableDocs/>
      </div>

      <div className='paper with-border rounded'>
        <AutorunDocs/>
      </div>

      <div className='paper with-border rounded'>
        <ObserverDocs/>
      </div>
    </main>
  )
}

