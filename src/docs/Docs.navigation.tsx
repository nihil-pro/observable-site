import { Observable, observer } from 'kr-observable';
import { MouseEvent } from 'react';

class NavState extends Observable {
  paths = ["Observable", "makeObservable", "autorun", "observer"]
  selected = ""

  select(event: MouseEvent) {
    if (event.target instanceof HTMLLIElement) {
      this.selected = event.target.id
    }
    console.log(location.hash.replace('#', ''))
  }
}

const navState = new NavState()

export const DocsNavigation = observer(function docsNav(){
  return (
    <div className='flexible column with-space' style={{ position: 'sticky', top: 'calc(50px + 1rem)' }}>
      <h2>Api</h2>
      {navState.paths.map(path => <a href={`#${path}`} key={path}>{path}</a>)}
    </div>
  )
})