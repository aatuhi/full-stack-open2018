import React from 'react'

const Statistiikka = props => {
  const calculateTotal = () => {
    return props.store.getState().good + props.store.getState().ok + props.store.getState().bad
  }

  const calculateMean = () => {
    const helper = (props.store.getState().good - props.store.getState().bad) / calculateTotal()
    return Math.round(helper * 10) / 10
  }

  const getPositiveProportion = () => {
    const helper = (props.store.getState().good / calculateTotal()) * 100
    return Math.round(helper) + '%'
  }

  if (calculateTotal() === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>Hyvä {props.store.getState().good}</td>
            <td />
          </tr>
          <tr>
            <td>Neutraali {props.store.getState().ok}</td>
            <td />
          </tr>
          <tr>
            <td>Huono {props.store.getState().bad}</td>
            <td />
          </tr>
          <tr>
            <td>Keskiarvo {calculateMean()}</td>
            <td />
          </tr>
          <tr>
            <td>Positiivisia {getPositiveProportion()}</td>
            <td />
          </tr>
        </tbody>
      </table>

      <button onClick={() => props.store.dispatch({ type: 'ZERO' })}>Nollaa tilasto</button>
    </div>
  )
}

export default Statistiikka
