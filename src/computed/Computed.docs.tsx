import { Highlighter } from '../Highliter';


const computedSyntax = `class State extends Observable {
  get prop() {
    // ...
  }
}
`

const computedExample = `class State extends Observable {
  a = 1
  b = 2
  
  get isLess() {
    return this.a < this.b
  }
}

const state = new State()

state.listen((key, value) => {
  console.log(\`\${key} changed\`, 'Value:', value)
})

autorun(() => {
  console.log('Run reaction', state.isLess)
})

const timer = setInterval(() => {
  state.b -= 1
}, 1000)

setTimeout(() => {
  clearInterval(timer)
  state.b = 5
}, 5010)

`

const preferClasses = 'https://github.com/nihil-pro/kr-observable/wiki/Why-is-it-better-to-use-classes%3F'
const getter = 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get'

export function Computed() {
  return (
    <div id="computed" className='paper rounded with-border no-padding flexible column with-space'>
      <div className="flexible column with-space paper">
        <h3>Computed</h3>
        <div className='flexible column with-small-space'>
          <p>
            A&nbsp;computed property in&nbsp;<em>Observable</em> is&nbsp;just a&nbsp;<a href={getter}>getter</a> that caches its
            value until one of&nbsp;the underlying observables has changed.
          </p>
        </div>
      </div>
      <code className="flexible column with-small-space">
        <b>Syntax</b>
        <pre ref={Highlighter.highlight}>
          {computedSyntax}
        </pre>
      </code>
      <div className='paper'>
        <p>
          All getters automatically become computed, but they can be&nbsp;<a href='#ignore'>ignored</a> as&nbsp;well as&nbsp;properties.
        </p>
        <p>The example below demonstrates how computed values work.</p>
      </div>
      <code className="flexible column with-small-space">
        <b>Example</b>
        <pre ref={Highlighter.highlight}>
          {computedExample}
        </pre>
        <hr/>
        <pre ref={Highlighter.highlight} className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            Run reaction true<br/>
            b was changed. Value: 1<br/>
            isLess was changed. Value: false<br/>
            Run reaction false<br/>
            b was changed. Value: 0<br/>
            b was changed. Value: -1<br/>
            b was changed. Value: -2<br/>
            b was changed. Value: -3<br/>
            b was changed. Value: 5<br/>
            isLess was changed. Value: true<br/>
            Run reaction true
          </pre>
      </code>
      <div className="flexible column with-small-space paper">
        <p>
          As&nbsp;you can see, reaction was invoked three times. <br/>
          – The first, when the autorun was called, because that&rsquo;s how it&nbsp;<a href="#autorun">work</a>.<br/>
          – The second, when the <b>b</b>&nbsp;value was changed from <b>2</b>&nbsp;to&nbsp;<b>1</b>.
          That&rsquo; because the <b>isLess</b> value became <b>false</b>.<br/>
          – The third, when the <b>b</b>&nbsp;value was changed from <b>-3</b>&nbsp;to&nbsp;<b>5</b>.
          That&rsquo; because the <b>isLess</b> value became <b>true</b>.
        </p>
        <p>
          At&nbsp;the same time, the value of&nbsp;<b>b</b>, which the <b>isLess</b> property depends&nbsp;on,
          was changed three more times, but this did not lead to&nbsp;unnecessary reactions.
        </p>
      </div>
    </div>
  )
}