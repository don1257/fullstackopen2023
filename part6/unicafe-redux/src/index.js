import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
        type: 'BAD'
    })
  }

  const okay = () => {
      store.dispatch({
          type: 'OKAY'
      })
    }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={okay}>ok</button>
      <button onClick={bad}>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>okay {store.getState().okay}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
