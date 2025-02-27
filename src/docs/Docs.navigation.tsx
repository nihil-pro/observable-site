export function DocsNavigation(){
  return (
    <div className='flexible column with-large-space' style={{ position: 'sticky', top: 'calc(50px + 1rem)' }}>
      <div className="flexible column with-small-space">
        <h6>Api</h6>
        {[ 'Observable', 'makeObservable', 'autorun', 'observer' ].map(path => {
          return <a href={`#${path}`} key={path}>{path}</a>;
        })}
      </div>

      <div className="flexible column with-small-space">
        <h6>Concepts</h6>
        {[ "Batching", "computed" ].map(path => {
          return <a href={`#${path}`} key={path}>{path}</a>;
        })}
      </div>
    </div>
  )
}