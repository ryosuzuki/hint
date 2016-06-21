import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import _ from 'lodash'

const codeStore = (state, action) => {
  switch (action.typ) {
  case 'ADD':
    return {
      content: action.content
    }
  default:
    return state
  }
}

let store = createStore(codeStore)

const addCode = (content) => {
  return {
    type: 'ADD',
    content: content
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      steps: '',
      step: 0
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.show = this.show.bind(this);
    $.get(this.props.src, function (res) {
      this.setState({
        code: res.code,
        steps: res.steps
      })
      console.log(this)
    }.bind(this))
  }

  show () {
    let steps = this.state.steps
    let current = _.slice(steps, 0, this.state.step)
    this.state.current = current.join('\n')
    this.setState(this.state)
  }

  next () {
    if (this.state.steps.length <= this.state.step) return
    this.state.step++
    this.show()
  }

  prev () {
    if (0 >= this.state.step) return
    this.state.step--
    this.show()
  }

  render () {
    return <div className="ui grid">
      <div className="eight wide column">
        <pre><code prism className="language-python">{this.state.code}</code></pre>
        <div className="ui buttons">
         <button className="ui button" onClick={this.prev}>Back</button>
         <div className="or"></div>
         <button className="ui positive button" onClick={this.next}>Next</button>
        </div>
        <p>{this.state.step}</p>
      </div>
      <div className="eight wide column">
        <pre><code prism className="language-python">{this.state.current}</code></pre>
      </div>
    </div>
  }
}

render(<App src='/sample.json' />, document.getElementById('root'))





