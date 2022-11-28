import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createVote(state, action) {
      const id = action.payload
      return state.map(anecdote => {
        return (
          anecdote.id === id ? 
          { ...anecdote, votes: anecdote.votes + 1} : 
          anecdote
        )
      }) 
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
