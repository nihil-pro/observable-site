```ts
const object = {
  a: 1,
  b: 2,
  
  get () {
    return this.a < this.b
  }
}
```

Compute on first access and memoize 

When 
    a or b was changed ->
        -> recompute
            if result changed -> report
                after report getter is accessed again. Should recompute?
                
            else -> do nothing