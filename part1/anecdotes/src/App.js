import { useState } from 'react'

const Heading = (props) => {
  return <h1>{props.title}</h1>
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Votes = (props) => {
  return <p>has {props.votes[props.idx]} votes</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map(() => 0));

  const randAnecdote = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const addVote = () => {
    return () => {
      const copy = [...votes];
      copy[selected] += 1;
      setVotes(copy);
    }
  }

  const topVoted = () => {
    let max = Math.max(...votes);
    return votes.findIndex(votes => votes === max);
  }

  return (
    <div>
      <Heading title="Anecdote of the day" />
      {anecdotes[selected]}
      <Votes votes={votes} idx={selected} />
      <Button handleClick={addVote()} text="vote" />
      <Button handleClick={() => setSelected(randAnecdote())} text="next anecdote" />
      <Heading title="Anecdote with most votes" />
      {anecdotes[topVoted()]}
      <Votes votes={votes} idx={topVoted()} />
    </div>
  )
}

export default App
