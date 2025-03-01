import { Highlighter } from '../../Highliter';

const multiple = `class Source1 extends Observable {
  a = 1;
}

class Source2 extends Observable {
  a = 1;
}

class State3 extends Observable {
  one = new Source1();
  two = new Source2();
  
  get total() {
    return this.one.a + this.two.a
  }
}

const state = new State3()

autorun(() => {
  console.log('total', state.total)
})

setTimeout(() => {
  state.one.a += 1
}, 1000)

setTimeout(() => {
  state.two.a += 1
}, 2000)

`

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

const computedSubscribeExample = `class State extends Observable {
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

state.subscribe(() => {
  console.log('isLess was changed')
}, new Set(['isLess']))

const timer = setInterval(() => {
  state.b -= 1
}, 1000)

setTimeout(() => {
  clearInterval(timer)
  state.b = 5
}, 5010)

`

const fixedSubscriber = `// read getter
if (state.isLess != null) {
  state.subscribe(() => {
    console.log('Run reaction')
  }, new Set(['isLess']))
}

`

const getter = 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/get'

export function Computed() {
  return (
    <div id="computed" className="flexible column with-space">
      <div className="flexible column with-space paper">
        <h3>Computed</h3>
        <div className="flexible column with-small-space">
          <p>
            A&nbsp;computed property in&nbsp;<em>Observable</em> is&nbsp;just a&nbsp;<a href={getter}>getter</a> that
            caches its
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
      <div className="paper">
        <p>
          All getters automatically become computed, but they can be&nbsp;<a href="#ignore">ignored</a> as&nbsp;well
          as&nbsp;properties.
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
            Run reaction true 👌<br/>
            b was changed. Value: 1<br/>
            isLess was changed. Value: false<br/>
            Run reaction false 👌<br/>
            b was changed. Value: 0<br/>
            b was changed. Value: -1<br/>
            b was changed. Value: -2<br/>
            b was changed. Value: -3<br/>
            b was changed. Value: 5<br/>
            isLess was changed. Value: true<br/>
            Run reaction true 👌
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
          was changed four more times, but this did not lead to&nbsp;unnecessary reactions.
        </p>
      </div>
      <hr/>
      <div className="flexible column with-small-space paper">
        <p>
          ☞ Computeds can derive values from different observables
        </p>
      </div>
      <code className="flexible column with-small-space">
        <b>Example</b>
        <pre ref={Highlighter.highlight}>{multiple}</pre>
        <hr/>
        <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
          Log:<br/>
          total 2<br/>
          total 3<br/>
          total 4
        </pre>
      </code>
      <hr/>
      <div className="flexible column with-small-space paper">
        <b>Restrictions</b>
        <p>
          Because computeds evaluate lazy, you can't <a href='#subscribe'>subscribe</a> to&nbsp;computed property until it&nbsp;was read.<br/>
          In example below, subscriber won't be invoked.
        </p>
      </div>
      <code className="flexible column with-small-space">
        <b>Example</b>
        <pre ref={Highlighter.highlight}>
          {computedSubscribeExample}
        </pre>
        <hr/>
        <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
          Log:<br/>
          b was changed. Value: 1<br/>
          b was changed. Value: 0<br/>
          b was changed. Value: -1<br/>
          b was changed. Value: -2<br/>
          b was changed. Value: -3<br/>
          b was changed. Value: 5<br/>
        </pre>
        <hr/>
        <span>We can fix it like this:</span>
        <pre ref={Highlighter.highlight}>
          {fixedSubscriber}
        </pre>
        <hr/>
        <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
          Log:<br/>
          b was changed. Value: 1<br/>
          isLess was changed. Value: false<br/>
          Run reaction 👌<br/>
          b was changed. Value: 0<br/>
          b was changed. Value: -1<br/>
          b was changed. Value: -2<br/>
          b was changed. Value: -3<br/>
          b was changed. Value: 5<br/>
          isLess was changed. Value: true<br/>
          Run reaction 👌<br/>
        </pre>
      </code>
    </div>
  )
}