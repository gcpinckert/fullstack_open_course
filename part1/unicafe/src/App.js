import { useState } from 'react';

const Heading = (props) => {
  return <h1>{props.title}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const VALUES = { good: 1, neutral: 0, bad: -1};

  const sum = () => {
    return props.good + props.neutral + props.bad;
  }

  const average = () => {
    let total = (props.good * VALUES.good) + (props.neutral * VALUES.neutral) + (props.bad * VALUES.bad);
    return (total / sum()).toFixed(2);
  }

  const percentPositive = () => {
    return ((props.good / sum()) * 100).toFixed(2);
  }

  if (Object.values(props).every(feedback => feedback === 0)) {
    return (
      <p>No feedback given</p>
    )
  } else {
      return (
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good} />
            <StatisticLine text='neutral' value={props.neutral} />
            <StatisticLine text='bad' value={props.bad} />
            <StatisticLine text='all' value={sum()} />
            <StatisticLine text='average' value={average()} />
            <StatisticLine text='positive' value={`${percentPositive()} %`} />
          </tbody>
        </table>
      )
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addOne = (value, updateFn) => () => {
    updateFn(value + 1);
  }



  return (
    <div>
      <Heading title='give feedback' />
      <Button handleClick={addOne(good, setGood)} text="good" />
      <Button handleClick={addOne(neutral, setNeutral)} text="neutral" />
      <Button handleClick={addOne(bad, setBad)} text="bad" />
      <Heading title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
