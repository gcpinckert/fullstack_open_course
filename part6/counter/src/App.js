import { useState } from 'react';

const Display = ({ value }) => <div>{value}</div>

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const App = () => {
  const [value, setValue] = useState(0)

  const setToValue = (newValue) => {
    setValue(newValue);
  }
  
  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(value + 1)} text="plus" />
      <Button handleClick={() => setToValue(value - 1)} text="minus" />
      <Button handleClick={() => setToValue(0)} text="zero" />
    </div>
  )
}

export default App;
