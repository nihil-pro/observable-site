import { Highlighter } from '../../Highliter';

const ObservableSyntax = `import { Observable } from 'kr-observable';
          
class State extends Observable {
  // your code
}
const state = new State()
`

const SubscribeSyntax = `observable.subscribe(subscriber, properties);`
const SubscribeExampleSyntax = `import { Observable } from 'kr-observable';
          
class State extends Observable { 
  foo = 1
  bar = 2
}

const state = new State();
const properties = new Set(['foo'])
const subscriber = (keys) => console.log(keys, 'were changed');
state.subscribe(subscriber, properties);
`

const UnsubscribeSyntax = `observable.unsubscribe(subscriber);`

const ListenerSyntax = `observable.listen(listener);`

const ListenExampleSyntax = `import { Observable } from 'kr-observable';
          
class State extends Observable { 
  foo = 1
  bar = 2
}

const state = new State();
const listener = (key, value) => { 
  console.log(key, 'were changed', 'New value: ', value); 
} 
state.listen(listener);
`

const UnlistenSyntax = `observable.unlisten(listener);`

const IgnoreSyntax = `import { Observable } from 'kr-observable';
          
class User extends Observable { 
  static ignore = ['id']
  id: string;
  name: string;
}
const user = new User()
`

const serializable = `class State extends Observable {
  foo = 'bar'
}

const state = new State()
const plain = JSON.parse(JSON.stringify(state)) 
console.log(JSON.stringify(state))
console.log(plain, plain instanceof Observable)
`

const privateProperties = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties'
const bound = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind'
const inheritance = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#inheritance'
const setUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set'
const staticProperties = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static'
const plain = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer'

export function ObservableDocs() {
  return (
    <div id='Observable' className='flexible column with-large-space'>
      <div className="flexible column with-space">
        <div className="paper no-padding-bottom flexible column with-space">
          <h4 className="primary-color thin-text">Observable</h4>
          <p>
            A class that all your classes should inherit, to get reactivity power.<br/>
          </p>
        </div>
        <code className="flexible column with-small-space">
          <b>Syntax</b>
          <pre ref={Highlighter.highlight}>
              {ObservableSyntax}
            </pre>
        </code>
        <div className="paper">
          <div className="flexible column with-small-space">
            As a result:<br/>
            <p>– All own properties become observable, including those that will be added later;</p>
            <p>– Any value which type is <em>Array</em>, <em>Map</em>, <em>Set</em> or <a href={plain}>plain
              object</a> become deep observable;</p>
            <p>– All getters become <a href="#computed">computed</a>;</p>
            <p>– All methods become <a href={bound}>bound</a> to instance;</p>
            <p>– <a href={privateProperties}>Private</a> properties and methods are allowed;</p>
            <p>– Subclassing (<a href={inheritance}>inheritance</a>) is allowed;</p>
          </div>
        </div>
        <div className="paper no-padding-bottom">
          <p id="no-redefine">
            ☞ An instance of <em>Observable</em> is still a normal javascript object,
            which properties weren't redefined, converted to&nbsp;getter/setter pair or to something like Signal, Atom etc.
          </p>
        </div>
        <code className="flexible column with-small-space">
          <pre ref={Highlighter.highlight}>
              {serializable}
            </pre>
          <pre className="xl-6 lg-6 md-6 sm-6 xs-12">
            Log:<br/>
            {`{"foo":"bar"}`}<br/>
            <pre ref={Highlighter.highlight}>{`{foo: 'bar'}`} false</pre>
          </pre>
        </code>
      </div>

      <div className="flexible column with-space paper">
        <h5 id="#observable-instance-methods">Instance methods</h5>
        <details id="subscribe">
          <summary>subscribe</summary>
          <div className="paper quote flexible column with-large-space">
            <p id="subscribe">
              The subscribe method sets up a function, that will be called whenever certain properties changes.
            </p>
            <div className="flexible column with-small-space">
              <b>Syntax</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {SubscribeSyntax}
                </pre>
              </code>
            </div>
            <div className="flexible column with-small-space">
              <b>Arguments</b>
              <div className="quote flexible column with-space">
                <div id="subscriber">
                  <span className="primary-color">subscriber</span><sup className="primary-color">*</sup>
                </div>
                <p>
                  A function that will be called whenever certain <a
                  href="#subscriber-properties">properties</a> changes. <br/>
                  It will be called with one argument:
                </p>
                <div className="paper quote flexible column with-small-space">
                  <small><b>Parameters</b></small>
                  <span className="primary-color">keys</span>
                  <p>
                    A <a href={setUrl}><em>Set</em></a> of strings that represents properties in the
                    target <em>Observable</em> that have been changed.
                    It may contain one or more properties, if changes were made almost at the same time.
                  </p>
                </div>

                <div id="subscriber-properties">
                  <span className="primary-color">properties</span><sup className="primary-color">*</sup>
                </div>
                <p>
                  A <a href={setUrl}><em>Set</em></a> of strings that represents properties in target observable you
                  want to observe.
                  The subscriber will be called only when one or more of these properties will change. <br/>
                </p>
                <p>
                  ☞ <em>If you save a reference to the <em>Set</em>, you can add or remove items from it at run
                  time. <br/>
                  Subscriber will be called only for those properties that are currently in <em>Set</em>.
                </em>
                </p>
                <p>
                  ☞ You can safely mutate state inside subscriber – nothing will break.
                </p>
              </div>
            </div>
            <div className="flexible column with-small-space">
              <b>Return value</b>
              <p className='primary-color'>undefined</p>
            </div>
            <div className="flexible column with-small-space">
              <b>Example</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {SubscribeExampleSyntax}
                </pre>
              </code>
            </div>
          </div>
        </details>

        <details id="unsubscribe">
          <summary>unsubscribe</summary>
          <div className="quote paper flexible column with-large-space">
            <p>A method to unregister earlier registered <a href="#subscriber">subscriber</a></p>
            <div className="flexible column with-small-space">
              <b>Syntax</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {UnsubscribeSyntax}
                </pre>
              </code>
            </div>
            <div className="flexible column with-small-space">
              <b>Arguments</b>
              <div className="quote flexible column with-space">
                <div>
                  <span className="primary-color">subscriber</span><sup className="primary-color">*</sup>
                </div>
                <p>Earlier registered <a href="#subscriber">subscriber</a></p>
              </div>
            </div>
            <div className="flexible column with-small-space">
              <b>Return value</b>
              <p className='primary-color'>undefined</p>
            </div>
          </div>
        </details>

        <details id="listen">
          <summary>listen</summary>
          <div className="quote paper flexible column with-large-space">
            <p>The listen method sets up a function that will be called whenever something in Observable changes</p>
            <div className="flexible column with-small-space">
              <b>Syntax</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {ListenerSyntax}
                </pre>
              </code>
            </div>
            <div className="flexible column with-small-space">
              <b>Arguments</b>
              <div id="listener" className="quote flexible column with-space">
                <div>
                  <span className='primary-color'>listener</span><sup className="primary-color">*</sup>
                </div>
                <p>
                  A function that will be called whenever something in Observable changes.<br/>
                  It will be called with two arguments:
                </p>
                <div className="paper quote flexible column with-space">
                  <small><b>Parameters</b></small>
                  <div className="flexible column with-small-space">
                    <span className='primary-color'>key</span>
                    <p>Property in target observable which were changed.</p>
                  </div>
                  <div className="flexible column with-small-space">
                    <span className='primary-color'>value</span>
                    <p>New value attached to this property.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flexible column with-small-space">
              <b>Return value</b>
              <p className='primary-color'>undefined</p>
            </div>

            <div className="flexible column with-small-space">
              <b>Example</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {ListenExampleSyntax}
                </pre>
              </code>
            </div>
          </div>
        </details>

        <details id="unlisten">
          <summary>unlisten</summary>
          <div className="quote paper flexible column with-large-space">
            <p>A method to unregister earlier registered <a href="#listener">listener</a></p>
            <div className="flexible column with-small-space">
              <b>Syntax</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {UnlistenSyntax}
                </pre>
              </code>
            </div>
            <div className="flexible column with-small-space">
              <b>Arguments</b>
              <div className="quote flexible column with-space">
                <div><span className='primary-color'>listener</span><sup className="primary-color">*</sup></div>
                <p>Earlier registered <a href="#listener">listener</a>.</p>
              </div>
            </div>
            <div className="flexible column with-small-space">
              <b>Return value</b>
              <p className='primary-color'>undefined</p>
            </div>
          </div>
        </details>
      </div>

      <div className="flexible column with-space paper">
        <h5 id="#observable-properties">Instance properties</h5>
        <details>
          <summary>ignore</summary>
          <div id='ignore' className="quote paper flexible column with-large-space">
            <p>
              A <a href={staticProperties}>static</a> property which contains an array of properties in target
              Observable that should be ignored. <br/>
              These properties won't be made observable. <a href="#listener">Listeners</a> and <a
              href="#subscriber">subscribers</a> won't be notified about changes.
            </p>
            <div className="flexible column with-small-space">
              <b>Syntax</b>
              <code>
                <pre ref={Highlighter.highlight}>
                  {IgnoreSyntax}
                </pre>
              </code>
            </div>
          </div>
        </details>
      </div>

      <div className='flexible column with-small-space paper'>
        <h5>Restrictions</h5>
        <p>
          <a href="#subscribe">subscribe</a>, <a href="#unsubscribe">unsubscribe</a>, <a
          href="#listen">listen</a> and <a href="#unlisten">unlisten</a> are <em>readonly</em> methods. <br/>
          You can't redefine or overwrite them.
        </p>
      </div>
      <div className='paper'>
        <div>See also: <a href='#examples'>examples</a></div>
      </div>
    </div>
  )
}