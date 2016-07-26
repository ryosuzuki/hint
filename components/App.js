import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import Code from './Code'
import _ from 'lodash'

class App extends Component {

  componentDidMount() {
    $.get('sample/data-1.py', function (code) {
      console.log('app init code')
      this.props.store.dispatch(actions.initCode(code))
      // actions.initCode(code)
      // this.setState({
      //   code: res,
      // })
      // let len = res.split('\n').length
      // for (let i=0; i<len; i++) {
      //   $('#output').append(`<div id="line-${i+1}"></div>`)
      // }
    }.bind(this))
    $.get('sample/data-1.json', function (res) {
      let state = {
        step: 0,
        lines: res.lines,
        data_a: res.attempt,
        data_b: res.fixed,
        max: _.max([res.attempt.length, res.fixed.length]),
        hints: res.hints
      }
      this.props.store.dispatch(actions.initState(state))
    }.bind(this))
  }

  render () {
    return (
      <div id="main" className="ui grid">
        <section id="container" className="nine wide column">
          <Code data={this.props} actions={this.props.actions}/>
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
