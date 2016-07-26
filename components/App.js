import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'

class App extends Component {

  render () {
    return (
      <div id="main" className="ui grid">
        <section id="container" className="nine wide column">
          <Code/>
          <br />
          <Slider
            dots
            min={1}
            max={this.state.max}
            value={this.state.step}
            onChange={(value, ui) => {
              value = Math.floor(value)
              this.update(value)
            }}
          ></Slider>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
