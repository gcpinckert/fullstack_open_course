import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNewNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(newAnecdote))
    dispatch(setNewNotification(content))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }
  
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote