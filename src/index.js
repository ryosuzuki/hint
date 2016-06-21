import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import _ from 'lodash'
import { PrismCode } from 'react-prism'

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
      data_a: '',
      data_b: '',
      step_a: '',
      step_b: '',
      step: 0,
      max: 0
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
    this.init()
  }

  init () {
    $.get('sample/data-1.py', function (res) {
      this.setState({
        code: res,
      })
    }.bind(this))
    $.get('sample/data-1.json', function (res) {
      this.state.data_a = res.attempt
      this.state.data_b = res.fixed
      this.state.max = _.max([res.attempt.length, res.fixed.length])
      this.setState(this.state)
    }.bind(this))
  }

  update () {
    this.state.step_a = _.slice(this.state.data_a, 0, this.state.step).join('\n')
    this.state.step_b = _.slice(this.state.data_b, 0, this.state.step).join('\n')
    this.setState(this.state)
  }

  next () {
    if (this.state.max <= this.state.step) return
    this.state.step++
    this.update()
  }

  prev () {
    if (0 >= this.state.step) return
    this.state.step--
    this.update()
  }

  render () {
    return <div className="ui grid">
      <div className="six wide column">
        <h1>Attempt</h1>
        <pre><PrismCode className="language-python">{this.state.code}</PrismCode></pre>
        <div className="ui buttons">
         <button className="ui button" onClick={this.prev}>Back</button>
         <div className="or"></div>
         <button className="ui positive button" onClick={this.next}>Next</button>
        </div>
        <p>{this.state.step}</p>
      </div>
      <div className="four wide column">
        <h1>Incorrect</h1>
        <pre><code prism className="language-python">{this.state.step_a}</code></pre>
      </div>
      <div className="four wide column">
        <h1>Correct</h1>
        <pre><code prism className="language-python">{this.state.step_b}</code></pre>
      </div>
    </div>
  }
}

render(<App />, document.getElementById('root'))





