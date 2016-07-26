function updateStep (state, step) {
  if (value) state.step = value
  let line = state.lines[state.step-1]
  let height = 35 + 21 * (line - 1)
  let outputs = state.data_a[state.step-1]
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
    .css({top: height-40 })
    .show()
  } else {
    $('#error').hide()
  }

  let len = state.code.split('\n').length
  for (let i=len; i>line; i--) {
    $(`#line-${i}`).text(' ')
  }
  $(`#line-${line}`).html(html)
  state.error = error
  state.height = height
  return state
}


let reducer = function (state, action) {
  switch (action.type) {
    case 'UPDATE_STEP':
      let newState = updateStep(state, action.step)
      return newState
    default:
      return state
  }
}

export default reducer