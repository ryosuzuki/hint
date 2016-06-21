import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'

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
    this.state = { code: '' }
    $.get(this.props.src, function (res) {
      this.setState({ code: res })
      console.log(this)
    }.bind(this))
  }

  render () {
    return <pre><code prism className='language-java'>{this.state.code}</code></pre>
  }
}

render(<App src='/sample.py' />, document.getElementById('root'))