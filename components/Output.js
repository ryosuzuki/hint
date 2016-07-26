import React, { Component } from 'react'
import watch from 'redux-watch'

class Output extends Component {

  render () {
    return (
      <div id="output">
        {
          this.props.code.split('\n').map( (c, i) => {
            let outputs = {}
            this.props.stream.forEach( (data, i ) => {
              let line = data.line
              let output = data.output
              outputs[line] = output
            })
            return (
              <div id={`line-${i+1}`}>
                <If condition={outputs[i+1]}>
                  <span class='output-var'>{outputs[i+1].name}</span> = <span class='output-data'>{outputs[i+1].data}</span>
                </If>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Output