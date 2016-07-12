import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import _ from 'lodash'
import { ApSlider, ApSliderStyle } from 'apeman-react-slider'
import { PrismCode } from 'react-prism'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: 1,
      code: '',
      data_a: '',
      data_b: '',
      step_a: '',
      step_b: '',
      lines: '',
      step: 0,
      max: 0,
      height: 35
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
    this.change = this.change.bind(this);
    this.init()
  }

  init () {
    $.get(`sample/data-${this.state.id}.py`, function (res) {
      this.setState({
        code: res,
      })
      let len = res.split('\n').length
      for (let i=0; i<len; i++) {
        $('#output').append(`<div id="line-${i+1}"></div>`)
      }

    }.bind(this))
    $.get(`sample/data-${this.state.id}.json`, function (res) {
      console.log('res')
      this.state.step = 0
      this.state.lines = res.lines
      this.state.data_a = res.attempt
      this.state.data_b = res.fixed
      this.state.max = _.max([res.attempt.length, res.fixed.length])
      this.setState(this.state)
    }.bind(this))

    $(function () {
      $('#slider').range({
        min: 0,
        max: 10,
        start: 0,
        onChange: function (value) {
          this.state.step = value
          this.update()
        }
      })
    })

  }

  update (value) {
    if (value) this.state.step = value
    let line = this.state.lines[this.state.step-1]
    let height = 35 + 21 * (line - 1)
    let outputs = this.state.data_a[this.state.step-1]
    let html = outputs.map( (output) => {
      let v = output.var
      let d = output.data
      return `<span class='var'>${v}</span> = <span>${d}</span>`
    }).join(', ')
    $(`#line-${line}`).html(html)
    this.state.height = height

    if (this.state.step >= 5) {
      $('#error')
      .text(`x ${4} o 36`)
      .css({top: height-5 })
      .show()
    }

    // this.state.step_a = `<span id=${this.state.step}>${hoge}</span>` // _.slice(this.state.data_a, 0, this.state.step).join('\n')
    // this.state.step_b = _.slice(this.state.data_b, 0, this.state.step).join('\n')
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

  change () {
    if (this.state.id === 1) {
      this.state.id = 2
    } else {
      this.state.id = 1
    }
    this.setState(this.state)
    this.init()
  }

  render () {
    return <div className="ui grid">
      <div id="main" className="ten wide column">
        <h1>Prototype</h1>

        <ApSliderStyle highlightColor="green"/>
        <ApSlider
          initial={50}
          min={0}
          max={10}
          onChange={(value, ui) => {
            value = Math.floor(value)
            this.update(value)
          }}
        ></ApSlider>
        <div className="ui buttons">
        <button className="ui button" onClick={this.prev}>Back</button>
        <div className="or"></div>
        <button className="ui positive button" onClick={this.next}>Next</button>
        </div>
        <p>{this.state.step}</p>

        <div className="ui grid">
          <div id="container" className="twelve wide column">
            <pre>
              <i id="tick" className="fa fa-arrow-right" style={{top: this.state.height}}></i>
              <PrismCode className="language-python" data-line="1">{this.state.code}</PrismCode>
              <div id="output">{this.state.step_a}</div>
            </pre>
          </div>
          <div id="outer" className="four wide column">
            <div id="error" className="ui left pointing red basic label">
              That name is taken!
            </div>
          </div>
        </div>
        <button className="ui button" onClick={this.change}>Change</button>
      </div>
    </div>
  }
}

render(<App />, document.getElementById('root'))

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

