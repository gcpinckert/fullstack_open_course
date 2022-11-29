// ************************** FORMS ********************************************
import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br/>
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

// ************************* COUNTER *******************************************
// import { useState } from 'react';

// const useCounter = () => {
//   const [value, setValue] = useState(0)

//   const increase = () => {
//     setValue(value + 1)
//   }

//   const decrease = () => {
//     setValue(value - 1)
//   }

//   const zero = () => {
//     setValue(0)
//   }

//   return {
//     value,
//     increase,
//     decrease,
//     zero,
//   }
// }

// const Display = props => <div>{props.value}</div>

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>
//       {props.text}
//     </button>
//   )
// }


// const App = () => {
//   const counter = useCounter()
  
//   return (
//     <div>
//       <Display value={counter.value} />
//       <Button handleClick={counter.increase} text="plus" />
//       <Button handleClick={counter.decrease} text="minus" />
//       <Button handleClick={counter.zero} text="zero" />
//     </div>
//   )
// }

export default App;
