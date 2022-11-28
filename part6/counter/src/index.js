import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const Display = ({ value }) => <div>{value}</div>

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const App = () => {
  return (
    <div>
      <Display value={store.getState()} />
      <Button handleClick={() => store.dispatch({ type: 'INCREMENT' })} text="plus" />
      <Button handleClick={() => store.dispatch({ type: 'DECREMENT' })} text="minus" />
      <Button handleClick={() => store.dispatch({ type: 'ZERO' })} text="zero" />
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />);

renderApp()
store.subscribe(renderApp)