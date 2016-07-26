import React, { Component } from 'react'
import Slider from 'rc-slider'
import { PrismCode } from 'react-prism'

class Code extends Component {
  play() {
    let timer = setInterval(() => {
      if (this.props.data.error || this.props.data.max-1 <= this.props.data.step) {
        clearInterval(timer)
        this.props.actions.stopPlay()
      } else {
        this.nextStep()
      }
    }, 100)
  }

  nextStep () {
    if (this.props.data.max <= this.props.data.step) return
    let step = this.props.data.step+1
    this.props.actions.updateStep(step)
  }

  updateStep(value) {
    // let value = event.target.value
    let step = Math.floor(value)
    this.props.actions.updateStep(step)

    let outputs = this.props.data.data_a[this.props.data.step]
    let error = false
    let html = outputs.map( (output) => {
      if (!output.fixed) {
        return `<span class='output-var'>${output.var}</span> = <span class='output-data'>${output.data}</span>`
      } else {
        error = {
          var: output.var,
          data: output.data,
          fixed: output.fixed
        }
        return `<span class='output-var'>${output.var}</span> = <span class='output-data output-error'>${output.data}</span>`
      }
    }).join(', ')

    if (error) {
      $('#error')
      .text(`x ${error.data} o ${error.fixed}`)
      .css({top: this.props.data.height-40 })
      .show()
    } else {
      $('#error').hide()
    }

    let line = this.props.data.lines[this.props.data.step]
    let len = this.props.data.code.split('\n').length
    for (let i=len; i>line; i--) {
      $(`#line-${i}`).text(' ')
    }
    $(`#line-${line}`).html(html)
  }


  render() {
    return (
      <div>
        <pre>
          <i id="tick" className="fa fa-arrow-right" style={{top: this.props.data.height}}></i>
          <PrismCode className="language-python" data-line="1">{this.props.data.code}</PrismCode>
          <div id="output">
            {this.props.data.step}
          </div>
          <div id="outer">
            <div id="error" className="ui left pointing red basic label">
              Error
            </div>
          </div>
        </pre>
        <br />
        <Slider
          dots
          min={1}
          max={this.props.data.max}
          value={this.props.data.step}
          // marks={marks}
          onChange={this.updateStep.bind(this)}
        ></Slider>
        <br />
        <button className="ui button" onClick={this.play.bind(this)}><i className="fa fa-play"></i></button>
        <span>{this.props.data.step}</span>
      </div>
    )
  }
}

export default Code

// function updateStep (state, step) {
//   if (step) state.step = step
//   let line = state.lines[state.step-1]
//   let height = 35 + 21 * (line - 1)
//   let outputs = state.data_a[state.step-1]
//   let error = false
//   let html = outputs.map( (output) => {
//     if (!output.fixed) {
//       return `<span class='output-var'>${output.var}</span> = <span class='output-data'>${output.data}</span>`
//     } else {
//       error = {
//         var: output.var,
//         data: output.data,
//         fixed: output.fixed
//       }
//       return `<span class='output-var'>${output.var}</span> = <span class='output-data output-error'>${output.data}</span>`
//     }
//   }).join(', ')

//   if (error) {
//     $('#error')
//     .text(`x ${error.data} o ${error.fixed}`)
//     .css({top: height-40 })
//     .show()
//   } else {
//     $('#error').hide()
//   }

//   let len = state.code.split('\n').length
//   for (let i=len; i>line; i--) {
//     $(`#line-${i}`).text(' ')
//   }
//   $(`#line-${line}`).html(html)
//   state.error = error
//   state.height = height
//   return state
// }
