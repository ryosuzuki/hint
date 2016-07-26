import React, { Component } from 'react'

class Code extends Component {

  play() {
    let timer = setInterval(() => {
      if (this.props.error || this.props.max <= this.props.step) {
        clearInterval(timer)
        this.props.error = false
      } else {
        nextStep()
      }
    }, 100)
  }

  nextStep () {
    if (this.props.max <= this.props.step) return
    let step = this.props.step+1
    updateStep(step)
  }

  updateStep(event) {
    let value = event.target.value
    let step = Math.floor(valu)
    this.props.actions.updateStep(step)
  }

  render() {
    return (
      <pre>
        <i id="tick" className="fa fa-arrow-right" style={{top: this.props.height}}></i>
        <PrismCode className="language-python" data-line="1">{this.props.code}</PrismCode>
        <div id="output">
          {this.props.step}
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
        max={this.props.max}
        value={this.props.step}
        // marks={marks}
        onChange={this.updateStep.bind(this)}
      ></Slider>
      <br />
      <button className="ui button" onClick={this.play.bind(this)}><i className="fa fa-play"></i></button>
      <span>{this.props.step}</span>
    )
  }

}

export default TodoList