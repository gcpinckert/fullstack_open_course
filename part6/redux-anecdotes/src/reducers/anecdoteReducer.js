import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => {
        return (
          anecdote.id === updatedAnecdote.id ? 
          updatedAnecdote : 
          anecdote
        )
      }) 
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const createVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.vote(anecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
